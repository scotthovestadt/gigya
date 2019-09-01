import {AnonymousRequestFactory} from "./AnonymousRequestFactory";
import {GigyaRequest} from "./RequestFactory";

export interface UserKeyCredentials {
    userKey: string;
}

export abstract class AuthRequestFactory extends AnonymousRequestFactory {
    protected abstract sign(request: GigyaRequest<UserKeyCredentials>) : void;

    protected createNonce() {
        return Math.floor(Math.random() * Math.floor(Date.now()));
    }
}
