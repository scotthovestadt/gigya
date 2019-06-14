import _ = require('lodash');
import sleep from './helpers/sleep';
import SigUtils from './sig-utils';
import Admin from './admin';
import Socialize from './socialize';
import Accounts from './accounts';
import DS from './ds';
import GM from './gm';
import Fidm from './fidm';
import Reports from './reports';
import IDX from './idx';
import GigyaError from './gigya-error';
import GigyaResponse from './interfaces/gigya-response';
import ErrorCode from './interfaces/error-code';
import ProxyHttpRequest from './interfaces/proxy-http-request';
import BaseParams from './interfaces/base-params';

export * from './sig-utils';
export * from './admin';
export * from './socialize';
export * from './accounts';
export * from './ds';
export * from './gm';
export * from './fidm';
export * from './reports';
export * from './idx';
export * from './gigya-error';
export * from './interfaces/gigya-response';
export * from './interfaces/error-code';
export * from './interfaces/proxy-http-request';
export * from './interfaces/base-params';

export class Gigya {
    protected static readonly RATE_LIMIT_SLEEP = 2000;
    protected static readonly RETRY_LIMIT = 5;
    protected static readonly RETRY_DELAY = 5000;
    protected apiKey: string | undefined;
    protected dataCenter: string | undefined;
    protected userKey: string | undefined;
    protected secret: string | undefined;
    protected httpRequest: ProxyHttpRequest;
    public readonly sigUtils: SigUtils;
    public readonly admin: Admin;
    public readonly socialize: Socialize;
    public readonly accounts: Accounts;
    public readonly ds: DS;
    public readonly gm: GM;
    public readonly fidm: Fidm;
    public readonly reports: Reports;
    public readonly idx: IDX;

    /**
     * Initialize new instance of Gigya.
     */
    constructor();
    constructor(proxyHttpRequest: ProxyHttpRequest);
    constructor(apiKey: string, dataCenter: string, proxy: ProxyHttpRequest);
    constructor(apiKey: string, dataCenter: string, secret: string);
    constructor(apiKey: string, dataCenter: string, userKey: string, secret?: string);
    constructor(apiKeyOrProxy?: string | ProxyHttpRequest, dataCenter?: string, userKeyOrSecretOrProxy?: string | ProxyHttpRequest, secret?: string) {
        // Work with overload signature.
        if (typeof apiKeyOrProxy === 'function') {
            this.httpRequest = apiKeyOrProxy;
        } else if (apiKeyOrProxy) {
            this.apiKey = apiKeyOrProxy;
            this.dataCenter = dataCenter;
            if (typeof userKeyOrSecretOrProxy === 'function') {
                this.httpRequest = userKeyOrSecretOrProxy;
            } else if (!secret) {
                this.secret = userKeyOrSecretOrProxy;
            } else {
                this.userKey = userKeyOrSecretOrProxy;
                this.secret = secret;
            }
        }

        // Late-initialize default proxy to support browser-based environments.
        // Should not typically be used instead of Gigya JS SDK for public-facing sites.
        // Designed for environments where access is given directly to API in browser but request is proxied through server for credentials.
        if (!this.httpRequest) {
            this.httpRequest = require('./helpers/default-http-request').httpRequest;
        }

        // Initialize sub-classes.
        this.sigUtils = new SigUtils(this.secret);
        this.admin = new Admin(this);
        this.socialize = new Socialize(this);
        this.accounts = new Accounts(this);
        this.ds = new DS(this);
        this.gm = new GM(this);
        this.fidm = new Fidm(this);
        this.reports = new Reports(this);
        this.idx = new IDX(this);
    }

    /**
     * Make request to Gigya. Typically, you'll want to use the defined interface (for example gigya.accounts.getAccountInfo) instead of calling request directly.
     *
     * If a method is not available, create an issue or pull request at: https://github.com/scotthovestadt/gigya
     */
    public async request<R>(endpoint: string, userParams: any = {}): Promise<GigyaResponse & R> {
        return this._request<R>(endpoint, userParams);
    }

    /**
     * Internal handler for requests.
     */
    protected async _request<R>(endpoint: string, userParams: BaseParams & { [key: string]: any; }, retries = 0): Promise<GigyaResponse & R> {
        const isAdminEndpoint = endpoint.startsWith('admin.');

        // Data center can be passed as a "param" but shouldn't be sent to the server.
        let dataCenter = this.dataCenter || 'us1';

        if (!isAdminEndpoint) {
            dataCenter = userParams.dataCenter || dataCenter;
            delete userParams.dataCenter;
        }

        // Create final set of params with defaults, credentials, and params.
        const requestParams: { [key: string]: string | null | number | boolean; } = _.assignIn(
            _.mapValues(userParams, (value: any) => {
                if (value && (_.isObject(value) || _.isArray(value))) {
                    // Gigya wants arrays and objects stringified into JSON, eg Account profile and data objects.
                    return JSON.stringify(value);
                } else if (value === null) {
                    // Null is meaningful in some contexts. Ensure it is passed.
                    return 'null';
                } else {
                    return value;
                }
            }),
            {
                format: 'json'
            }
        );

        // Host is constructed from the endpoint namespace and data center.
        // Endpoint "accounts.getAccountInfo" and data center "us1" become "accounts.us1.gigya.com".
        const namespace = endpoint.substring(0, endpoint.indexOf('.'));
        const host = `${namespace}.${dataCenter}.gigya.com`;

        // Don't add credentials or API Key to request if oauth_token provided.
        if (!userParams.oauth_token) {
            // Add credentials to request if no credentials provided.
            if (!userParams.userKey) {
                if (this.userKey) {
                    requestParams['userKey'] = this.userKey;
                }
            }

            //add signature if a secret is not provided
            var sigSecret = "";
            if (userParams.secret) {
                sigSecret = userParams.secret;
            } else if (this.secret) {
                sigSecret = this.secret;
            }

            var timestamp = new Date().getTime();
            requestParams['timestamp'] = timestamp;
            requestParams['nonce'] = Math.floor(Math.random() * Math.floor(timestamp));

            //Add signature if secret provided  
            var protocol = "https";
            var resourceURI = `${protocol}://${host}/${endpoint}`;
            requestParams['sig'] = this.sigUtils.getOAuth1Signature(sigSecret, "POST", resourceURI, requestParams);

            // Add API key to request if not provided.
            if (!isAdminEndpoint && !userParams.apiKey && this.apiKey) {
                requestParams['apiKey'] = this.apiKey;
            }
        } 

        // Fire request.
        let response;
        try {
            response = await this.httpRequest<R>(endpoint, host, requestParams);
                        
            // Non-zero error code means failure.
            if (response.errorCode !== 0) {
                throw this.createErrorFromResponse(response, endpoint, userParams);
            }
        } catch (e) {
            // Check for error codes that signal need to retry.
            if (e.errorCode === ErrorCode.GENERAL_SERVER_ERROR
                || e.errorCode === ErrorCode.SEARCH_TIMED_OUT
                || e.errorCode === ErrorCode.CONCURRENT_UPDATES_NOT_ALLOWED) {
                retries++;
                if (retries < Gigya.RETRY_LIMIT) {
                    if (Gigya.RETRY_DELAY) {
                        await sleep(Gigya.RETRY_DELAY);
                    }
                    return this._request<R>(endpoint, userParams, retries);
                }
            }
            throw e;
        }

        // Check for rate limiting.
        if (response.errorCode === ErrorCode.RATE_LIMIT_HIT) {
            // Try again after waiting.
            await sleep(Gigya.RATE_LIMIT_SLEEP);
            return this._request<R>(endpoint, userParams, retries);
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

    /**
     * Create GigyaError from response.
     */
    protected createErrorFromResponse(response: GigyaResponse, endpoint: string, params: BaseParams & Object): GigyaError {
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
}

export default Gigya;
