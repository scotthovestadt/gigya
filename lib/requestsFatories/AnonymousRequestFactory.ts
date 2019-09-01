import {DataCenter} from "../interfaces/base-params";
import _ = require('lodash');
import {FormatJsonRequest, GigyaRequest, RequestFactory, RequestParams, UserParams} from "./RequestFactory";

export class AnonymousRequestFactory extends RequestFactory {
    constructor(protected _apiKey: string|undefined,
                protected _dataCenter: DataCenter) {
        super();
    }

    public create(endpoint: string, userParams: UserParams) {
        // Endpoint "accounts.getAccountInfo" and data center "us1" become "accounts.us1.gigya.com".
        const namespace = endpoint.substring(0, endpoint.indexOf('.'));
        const isAdminEndpoint = namespace == 'admin';
        const isOAuthRequest = !!userParams.oauth_token;

        // Data center can be passed as a "param" but shouldn't be sent to the server.
        let dataCenter = this._dataCenter;

        if (!isAdminEndpoint) {
            // treat "dataCenter" param as domain override
            // (else keep as an admin endpoint parameter - like for admin.createSite
            dataCenter = userParams.dataCenter || dataCenter;
            delete userParams.dataCenter;

            // complete default apikey only if not oauth request.
            if (!userParams.apiKey && !isOAuthRequest) {
                userParams.apiKey = this._apiKey;
            }
        }

        const request = {
            host: this.getRequestHost(namespace, dataCenter),
            endpoint,
            params: this.getRequestParams(userParams),
            headers: {}
        } as GigyaRequest;

        if (!isOAuthRequest) {
            this.sign(request);
        }

        return request;
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


    protected sign(request: GigyaRequest<any>) {
        // nothing.
    }
}