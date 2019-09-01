import {DataCenter} from "../interfaces/base-params";
import {GigyaRequest} from "./RequestFactory";
import {AuthRequestFactory, UserKeyCredentials} from "./AuthRequestFactory";

export interface SecretCredentials extends UserKeyCredentials {
    secret: string;
}

export class SimpleRequestFactory extends AuthRequestFactory {
    constructor(apiKey: string|undefined,
                dataCenter: DataCenter,
                protected _creds: SecretCredentials) {
        super(apiKey, dataCenter);
    }

    protected sign(request: GigyaRequest<SecretCredentials>) {
        // add credentials to sent params.
        request.params.userKey = request.params.userKey || this._creds.userKey;
        request.params.secret = request.params.secret || this._creds.secret;
    }
}