import Gigya from './gigya';
import GigyaResponse from './interfaces/gigya-response';

export class SAML {
    constructor(protected gigya: Gigya) {
    }

    /**
     * This API deletes a SAML Identity Provider (IdP).
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.delIdP+REST
     */
    public delIdP(params: any) {
        return this.gigya.request('fidm.saml.delIdP', params);
    }

    /**
     * This API retrieves the Gigya site configuration for SAML. 
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.getConfig+REST
     */
    public getConfig(params: any) {
        return this.gigya.request('fidm.saml.getConfig', params);
    }

    /**
     * This API retrieves all the SAML IdP configuration objects that are defined for the site.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.getRegisteredIdPs+REST
     */
    public getRegisteredIdPs(params: any) {
        return this.gigya.request('fidm.saml.getRegisteredIdPs', params);
    }

    /**
     * This API imports a SAML Identity Provider (IdP) configuration from a SAML metadata XML.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.importIdPMetadata+REST
     */
    public importIdPMetadata(params: any) {
        return this.gigya.request('fidm.saml.importIdPMetadata', params);
    }

    /**
     * This API updates or registers a SAML configuration for a specific Identity Provider (IdP).
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.registerIdP+REST
     */
    public registerIdP(params: any) {
        return this.gigya.request('fidm.saml.registerIdP', params);
    }

    /**
     * This API updates the Gigya SAML site configuration.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.setConfig+REST
     */
    public setConfig(params: any) {
        return this.gigya.request('fidm.saml.setConfig', params);
    }
}

export default SAML;
