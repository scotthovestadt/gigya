import {SecretCredentials, SimpleRequestFactory} from "./SimpleRequestFactory";
import {DataCenter} from "../gigya";
import SigUtils from '../sig-utils';
import {GigyaRequest, RequestParams} from "./RequestFactory";

const strictUriEncode = require('strict-uri-encode') as (str: string) => string;

interface SignedRequestParams {
    timestamp: number;
    nonce: number;
    sig: string;
}

export class SignedRequestFactory extends SimpleRequestFactory {
    constructor(apiKey: string|undefined,
                dataCenter: DataCenter,
                protected _sigUtils: SigUtils,
                creds: SecretCredentials,
                protected _httpMethod: "post" | "get" = 'post') {
        super(apiKey, dataCenter, creds);
    }

    protected sign(request: GigyaRequest<SecretCredentials & SignedRequestParams>) {
        super.sign(request);
        const requestParams = request.params;
        const effectiveSecret = requestParams.secret;

        // clear previous authentications
        delete requestParams.secret;
        delete requestParams.sig;

        if (effectiveSecret) {
            requestParams.timestamp = Date.now();
            requestParams.nonce = this.createNonce();
            requestParams.sig =
                this.createRequestSignature(
                    this._creds.secret,
                    `https://${request.host.toLowerCase()}/${request.endpoint}`,
                    requestParams);
        }
    }

    protected createRequestSignature(secret: string, uri: string, requestParams: RequestParams<any>) {
        const queryString =
            Object.keys(requestParams)
                .sort()
                .map(key => `${key}=${strictUriEncode((requestParams[key] || '').toString())}`)
                .join('&');
        const baseString = `${this._httpMethod.toUpperCase()}&${strictUriEncode(uri)}&${strictUriEncode(queryString)}`;
        return this._sigUtils.calcSignature(baseString, secret);
    }
}