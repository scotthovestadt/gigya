import Gigya from './gigya';
import GigyaResponse from './interfaces/gigya-response';
import OIDC from './fidm.oidc';
import SAML from './fidm.saml';

export class FIDM {
    public readonly oidc: OIDC;
    public readonly saml: SAML;

    constructor(protected gigya: Gigya) {
        this.oidc = new OIDC(gigya);
        this.saml = new SAML(gigya);
    }
}

export default FIDM;
