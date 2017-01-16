import Gigya from './gigya';
import GigyaResponse from './interfaces/gigya-response';
import FidmOidcOp from './fidm.oidc.op';
import FidmOidcRp from './fidm.oidc.rp';

export * from './interfaces/gigya-response';
export * from './fidm.oidc.op';
export * from './fidm.oidc.rp';

export class FidmOidc {
    public readonly op: FidmOidcOp;
    public readonly rp: FidmOidcRp;

    constructor(protected gigya: Gigya) {
        this.op = new FidmOidcOp(gigya);
        this.rp = new FidmOidcRp(gigya);
    }
}

export default FidmOidc;
