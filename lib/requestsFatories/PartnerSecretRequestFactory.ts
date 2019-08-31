import {AnonymousRequestFactory} from "./AnonymousRequestFactory";
import {DataCenter} from "../interfaces/base-params";
import {GigyaRequest} from "./RequestFactory";

export class PartnerSecretRequestFactory extends AnonymousRequestFactory {
    constructor(apiKey: string|undefined,
                dataCenter: DataCenter,
                protected secret: string) {
        super(apiKey, dataCenter)
    }

    protected sign(request: GigyaRequest<{secret: string}>) {
        request.params.secret = request.params.secret || this.secret;
    }
}