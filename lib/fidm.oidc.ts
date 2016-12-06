import Gigya from './gigya';
import GigyaResponse from './interfaces/gigya-response';
import OP from './fidm.oidc.op';

export class OIDC {
    public readonly op: OP;

    constructor(protected gigya: Gigya) {
        this.op = new OP(gigya);
    }
}

export default OIDC;
