import Gigya from './gigya';
import GigyaResponse from './interfaces/gigya-response';
import FidmOidc from './fidm.oidc';
import FidmSaml from './fidm.saml';

export * from './interfaces/gigya-response';
export * from './fidm.oidc';
export * from './fidm.saml';

export class Fidm {
    public readonly oidc: FidmOidc;
    public readonly saml: FidmSaml;

    constructor(protected gigya: Gigya) {
        this.oidc = new FidmOidc(gigya);
        this.saml = new FidmSaml(gigya);
    }
}

export default Fidm;
