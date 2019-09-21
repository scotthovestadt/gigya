import BaseParams, {DataCenter} from "./interfaces/base-params";
import {Headers} from "request";
import _ = require("lodash");

export interface FormatJsonRequest {
    format: 'json'
}

export type BaseRequest = { [key: string]: string | null | number | boolean };

export type RequestParams<P = BaseRequest> =
    FormatJsonRequest & P;

export type UserParams = BaseParams & BaseRequest;

export interface GigyaRequest<P = BaseRequest> {
    host: string;
    endpoint: string;
    params: RequestParams<P>
    headers: Headers;
    skipSigning: boolean;
}

export class RequestFactory {
    constructor(protected _apiKey: string|undefined,
                protected _dataCenter: DataCenter) {
    }

    public create(endpoint: string, userParams: UserParams) {
        // Endpoint "accounts.getAccountInfo" and data center "us1" become "accounts.us1.gigya.com".
        const namespace = endpoint.substring(0, endpoint.indexOf('.'));
        const isAdminEndpoint = namespace == 'admin';
        const isOAuth = !!userParams.oauth_token;

        // Data center can be passed as a "param" but shouldn't be sent to the server.
        let dataCenter = this._dataCenter;

        if (!isAdminEndpoint) {
            // treat "dataCenter" param as domain override
            // (else keep as an admin endpoint parameter - like for admin.createSite
            dataCenter = userParams.dataCenter || dataCenter;
            delete userParams.dataCenter;

            // complete default apikey only if not oauth request.
            if (!userParams.apiKey && !isOAuth) {
                userParams.apiKey = this._apiKey;
            }
        }

        const request = {
            host: this.getRequestHost(namespace, dataCenter),
            endpoint,
            params: this.getRequestParams(userParams),
            headers: {},
            skipSigning: isOAuth || this.isAnonymousEndpoint(endpoint)
        } as GigyaRequest;

        return request;
    }

    private isAnonymousEndpoint(endpoint: string) {
        return [
            'accounts.getScreenSets',
            'accounts.getJWTPublicKey'
        ].includes(endpoint);
    }

    protected getRequestHost(namespace: string, dataCenter: DataCenter) {
        return `${namespace}.${dataCenter}.${dataCenter != 'cn1' ? 'gigya.com' : 'gigya-api.cn'}`;
    }

    protected getRequestParams(userParams: UserParams): RequestParams {
        return _.assignIn(
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
            } as FormatJsonRequest
        );
    }
}