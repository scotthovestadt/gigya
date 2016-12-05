import _ = require('lodash');
import request = require('request');
import sleep from './helpers/sleep';
import SigUtils from './sig-utils';
import Socialize from './socialize';
import Accounts from './accounts';
import DS from './ds';
import GigyaError from './gigya-error';
import GigyaResponse from './interfaces/gigya-response';
import ErrorCode from './interfaces/error-code';

export class Gigya {
    protected static readonly _RATE_LIMIT_SLEEP = 2000;
    protected APIKey: string;
    protected dataCenter: string;
    protected userKey: string | undefined;
    protected secret: string;
    public readonly sigUtils: SigUtils;
    public readonly socialize: Socialize;
    public readonly accounts: Accounts;
    public readonly ds: DS;

    constructor(APIKey: string, dataCenter: string, secret: string);
    constructor(APIKey: string, dataCenter: string, userKey: string, secret?: string);
    constructor(APIKey: string, dataCenter: string, userKey: string, secret?: string) {
        // Work with overload signature.
        this.APIKey = APIKey;
        this.dataCenter = dataCenter;
        if (!secret) {
            this.secret = userKey;
        } else {
            this.userKey = userKey;
            this.secret = secret;
        }

        this.sigUtils = new SigUtils(this.secret);
        this.socialize = new Socialize(this);
        this.accounts = new Accounts(this);
        this.ds = new DS(this);
    }

    protected http<R>(uri: string, params: any): Promise<GigyaResponse & R> {
        return new Promise<GigyaResponse & R>((resolve, reject) => {
            request.post(uri, {
                method: 'post',
                form: params
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                }
                try {
                    resolve(JSON.parse(body));
                } catch (ex) {
                    reject(ex);
                }
            });
        });
    }

    protected createErrorFromResponse(response: GigyaResponse, endpoint: string, params: Object) {
        // Create meaningful error message.
        let errorMessage = `Gigya API ${endpoint} failed with error code ${response.errorCode}`;
        const errorDetails = response.errorDetails ? response.errorDetails : response.errorMessage;
        if (errorDetails) {
            errorMessage += ` and message ${errorDetails}`;
        }
        if (response.validationErrors) {
            errorMessage += ':';
            for (const validationError of response.validationErrors) {
                errorMessage += ` ${validationError.fieldName}: ${validationError.message}`;
            }
        }

        const error = new GigyaError(errorMessage);
        error.gigyaResponse = response;
        error.errorCode = response.errorCode;
        error.params = params;
        return error;
    }

    public async request<R>(endpoint: string, userParams: any, retries = 0, retryOnAnyError = false, retryDelay = 5000): Promise<GigyaResponse & R> {
        // Get endpoint namespace.
        const namespace = endpoint.substring(0, endpoint.indexOf('.'));

        // Create final set of params with defaults, credentials, and params.
        const requestParams: { [key: string]: string; } = _.assignIn(
            {
                format: 'json',
                userKey: this.userKey,
                secret: this.secret
            },
            userParams
        ) as any;
        if (this.APIKey && namespace !== 'admin') {
            requestParams['APIKey'] = this.APIKey;
        }

        // Gigya wants most arrays and objects stringified into JSON, eg Account profile and data objects.
        for (const key in requestParams) {
            const value = requestParams[key];
            if (value && (_.isObject(value) || _.isArray(value))) {
                requestParams[key] = JSON.stringify(value);
            }
        }

        // Construct URL (minus params).
        const uri = `https://${namespace}.${this.dataCenter}.gigya.com/${endpoint}`;

        // Fire request.
        let response;
        try {
            response = await this.http<R>(uri, requestParams);

            // Check for error codes that signal need to retry.
            if (retryOnAnyError && response.errorCode !== 0
                || (
                    (response.errorCode === ErrorCode.GENERAL_SERVER_ERROR
                        || response.errorCode === ErrorCode.SEARCH_TIMED_OUT
                        || response.errorCode === ErrorCode.CONCURRENT_UPDATES_NOT_ALLOWED
                    )
                )
            ) {
                throw this.createErrorFromResponse(response, endpoint, userParams);
            }
        } catch (e) {
            // Retry.
            retries++;
            if (retries > 10) {
                throw e;
            }
            if (retryDelay) {
                await sleep(retryDelay);
            }
            return this.request<R>(endpoint, userParams, retries);
        }

        // Check for rate limiting.
        if (response.errorCode === ErrorCode.RATE_LIMIT_HIT) {
            // Try again after waiting.
            await sleep(Gigya._RATE_LIMIT_SLEEP);
            return this.request<R>(endpoint, userParams, retries);
        }

        // Ensure Gigya returned successful response. If not, throw error with details.
        if ((response.errorCode !== ErrorCode.SUCCESS
            && response.errorCode !== undefined // exportUsers doesn't return an error code
            && response.errorCode !== ErrorCode.PENDING_REGISTRATION
            && response.errorCode !== ErrorCode.PENDING_VERIFICATION)
        ) {
            throw this.createErrorFromResponse(response, endpoint, userParams);
        }

        // Return Gigya's successful response.
        return response;
    }
}

export * from './gigya-error';

export default Gigya;
