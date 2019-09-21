import {GigyaRequest} from "../RequestFactory";
import {ISigner} from "./ISigner";
import {isCredentials} from "./AuthRequestSigner";

export type PartnerSecret = string;

export function hasPartnerSecret(credentials: { secret: PartnerSecret} | any): credentials is { secret: PartnerSecret } {
    return !!credentials.secret && !isCredentials(credentials);
}

export class PartnerSecretSigner  implements ISigner {
    constructor(protected secret: PartnerSecret) {
    }

    public sign(request: GigyaRequest<{secret: PartnerSecret}>) {
        request.params.secret = this.secret;
    }
}