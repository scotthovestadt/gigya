import {AnonymousRequestFactory} from "./AnonymousRequestFactory";
import {DataCenter} from "../interfaces/base-params";
import {GigyaRequest} from "./RequestFactory";

export interface Credentials {
    userKey: string;
    secret: string;
}

export class SimpleRequestFactory extends AnonymousRequestFactory {
    constructor(apiKey: string|undefined,
                dataCenter: DataCenter,
                protected _creds: Credentials) {
        super(apiKey, dataCenter)
    }

    protected sign(request: GigyaRequest<Credentials>) {
        // add credentials to sent params.
        request.params.userKey = request.params.userKey || this._creds.userKey;
        request.params.secret = request.params.secret || this._creds.secret;
    }
}