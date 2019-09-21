import {GigyaRequest} from "../RequestFactory";
import {AuthRequestSigner, isCredentials, UserKeyCredentials} from "./AuthRequestSigner";

export interface SecretCredentials extends UserKeyCredentials {
    secret: string;
}

export function isSecretCredentials(credentials: SecretCredentials | any): credentials is SecretCredentials {
    return !!credentials.secret && isCredentials(credentials);
}

export class SimpleRequestSigner extends AuthRequestSigner<SecretCredentials> {
    constructor(_creds: SecretCredentials) {
        super(_creds);
    }

    public sign(request: GigyaRequest<SecretCredentials>) {
        // add credentials to sent params.
        request.params.userKey = this._creds.userKey;
        request.params.secret = this._creds.secret;
    }
}