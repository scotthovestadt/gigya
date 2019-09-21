import _ = require('lodash');
import sleep from './helpers/sleep';
import SigUtils from './sig-utils';
import Admin, {DataCenter} from './admin';
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
import * as DefaultHttpRequest from './helpers/default-http-request';
import {CredentialsSigner} from "./requestsSigners/CredentialsSigner";
import {RequestFactory} from "./RequestFactory";
import {hasPartnerSecret, PartnerSecret, PartnerSecretSigner} from "./requestsSigners/PartnerSecretSigner";
import {AnonymousRequestSigner, isAnonymous, NoCredentials} from "./requestsSigners/AnonymousRequestSigner";
import {AuthBearerSigner, isRSACreds, RSACredentials} from "./requestsSigners/AuthBearerSigner";
import {isSecretCredentials, SecretCredentials} from "./requestsSigners/SimpleRequestSigner";
import {ISigner} from "./requestsSigners/ISigner";
import {isCredentials} from "./requestsSigners/AuthRequestSigner";

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

export interface FormatJsonRequest {
    format: 'json'
}

export interface SignedRequestParams {
    timestamp: number;
    nonce: number;
    sig: string;
}

export type RequestParams =
    FormatJsonRequest
    & Partial<SignedRequestParams>
    & { [key: string]: string | null | number | boolean };

const strictUriEncode = require('strict-uri-encode') as (str: string) => string;

export type CredentialsType = NoCredentials | { secret: PartnerSecret } | SecretCredentials | RSACredentials;

export class Gigya {
    protected static readonly RATE_LIMIT_SLEEP = 2000;
    protected static readonly RETRY_LIMIT = 5;
    protected static readonly RETRY_DELAY = 5000;

    protected _apiKey: string | undefined;

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

    protected _signer: ISigner;

    /**
     * Initialize new instance of Gigya.
     */
    constructor();
    constructor(proxyHttpRequest: ProxyHttpRequest);
    constructor(apiKey: string, dataCenter: DataCenter, proxy?: ProxyHttpRequest);
    constructor(apiKey: string, dataCenter: DataCenter, secret: string);
    constructor(apiKey: string, dataCenter: DataCenter, userKey: string, secret?: string);
    constructor(apiKey: string, dataCenter: DataCenter, credentials: RSACredentials);
    constructor(apiKeyOrProxy?: string | ProxyHttpRequest,
                protected _dataCenter: DataCenter = 'us1',
                userKeyOrSecretOrCredentialsOrProxy?: string | RSACredentials | ProxyHttpRequest,
                secret?: string) {

        let creds: CredentialsType = false;

        // Work with overload signature.
        if (typeof apiKeyOrProxy === 'function') {
            this.httpRequest = apiKeyOrProxy;
        } else if (apiKeyOrProxy) {
            this._apiKey = apiKeyOrProxy;

            switch (typeof userKeyOrSecretOrCredentialsOrProxy) {
                case 'object':
                    creds = userKeyOrSecretOrCredentialsOrProxy as RSACredentials;
                    break;
                case 'string':
                    if (!secret) {
                        creds = {secret: userKeyOrSecretOrCredentialsOrProxy as PartnerSecret};
                    } else {
                        creds = {
                            userKey: userKeyOrSecretOrCredentialsOrProxy,
                            secret
                        } as SecretCredentials;
                    }
                    break;
                case 'function': // proxy
                    this.httpRequest = userKeyOrSecretOrCredentialsOrProxy;
                // fallthrough
                default:
                    creds = false as NoCredentials;

            }
        }

        // Late-initialize default proxy to support browser-based environments.
        // Should not typically be used instead of Gigya JS SDK for public-facing sites.
        // Designed for environments where access is given directly to API in browser but request is proxied through server for credentials.
        if (!this.httpRequest) {
            this.httpRequest = DefaultHttpRequest.httpRequest;
        }

        // Initialize sub-classes.
        this.sigUtils = new SigUtils(secret);
        this.admin = new Admin(this);
        this.socialize = new Socialize(this);
        this.accounts = new Accounts(this);
        this.ds = new DS(this);
        this.gm = new GM(this);
        this.fidm = new Fidm(this);
        this.reports = new Reports(this);
        this.idx = new IDX(this);

        this.setCredentials(creds);
    }

    public setCredentials(credentials: CredentialsType): this {
        const signer = this.getSigner(credentials);
        if (!signer) throw 'unsupported credentials';
        this._signer = signer;
        return this;
    }

    protected getSigner(credentials: CredentialsType): ISigner|null {
        if (isAnonymous(credentials)) {
            return new AnonymousRequestSigner();
        } else if (hasPartnerSecret(credentials)) {
            return new PartnerSecretSigner(credentials.secret as PartnerSecret);
        } else if (isCredentials(credentials)) {
            if (isRSACreds(credentials)) {
                return new AuthBearerSigner(credentials);
            } else if (isSecretCredentials(credentials)) {
                return new CredentialsSigner(
                    this.sigUtils,
                    credentials,
                    DefaultHttpRequest.httpMethod);
            } else {
                throw 'missing secret/privateKey';
            }
        }

        return null;
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
        const requestFactory = new RequestFactory(
            userParams.apiKey || this._apiKey,
            userParams.dataCenter || this._dataCenter);

        const request = requestFactory.create(endpoint, userParams);

        if (!request.skipSigning) {
            const signer = this.getSigner(userParams as CredentialsType) || this._signer;
            signer.sign(request);
        }

        // Fire request.
        let response;
        try {
            response = await this.httpRequest<R>(
                request.endpoint,
                request.host,
                request.params,
                request.headers);

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

    protected createRequestSignature(secret: string, uri: string, requestParams: RequestParams) {
        const httpMethod = DefaultHttpRequest.httpMethod.toUpperCase();
        const queryString =
            Object.keys(requestParams)
                .sort()
                .map(key => `${key}=${strictUriEncode((requestParams[key] || '').toString())}`)
                .join('&');
        const baseString = `${httpMethod}&${strictUriEncode(uri)}&${strictUriEncode(queryString)}`;
        return this.sigUtils.calcSignature(baseString, secret);
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
