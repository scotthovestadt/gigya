import {GigyaRequest} from "../RequestFactory";
import {ISigner} from "./ISigner";

export type NoCredentials = false;
export function isAnonymous(credentials: NoCredentials|any): credentials is NoCredentials {
    return credentials === false;
}

export class AnonymousRequestSigner implements ISigner {
    public sign(request: GigyaRequest) {}
}