import {GigyaRequest} from "../RequestFactory";

export interface ISigner {
    sign(request: GigyaRequest<any>): void;
}