import Gigya from './gigya';
import GigyaResponse from './interfaces/gigya-response';
import BaseParams from './interfaces/base-params';

export * from './interfaces/gigya-response';
export * from './interfaces/base-params';

export class IdP {
    constructor(protected gigya: Gigya) {
    }

    /**
     * This API deletes a SAML Identity Provider (IdP).
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.idp.delIdP+REST
     */
    public delIdP(params: BaseParams & any) {
        return this.gigya.request('fidm.saml.idp.delIdP', params);
    }

    /**
     * This API retrieves the Gigya site configuration for SAML. 
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.idp.getConfig+REST
     */
    public getConfig(params: BaseParams & any) {
        return this.gigya.request<any>('fidm.saml.idp.getConfig', params);
    }

    /**
     * This API retrieves all the SAML IdP configuration objects that are defined for the site.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.idp.getRegisteredIdPs+REST
     */
    public getRegisteredIdPs(params: BaseParams & any) {
        return this.gigya.request<any>('fidm.saml.idp.getRegisteredIdPs', params);
    }

    /**
     * This API imports a SAML Identity Provider (IdP) configuration from a SAML metadata XML.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.idp.importIdPMetadata+REST
     */
    public importIdPMetadata(params: BaseParams & any) {
        return this.gigya.request<any>('fidm.saml.idp.importIdPMetadata', params);
    }

    /**
     * This API updates or registers a SAML configuration for a specific Identity Provider (IdP).
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.idp.registerIdP+REST
     */
    public registerIdP(params: BaseParams & any) {
        return this.gigya.request('fidm.saml.idp.registerIdP', params);
    }

    /**
     * This API updates the Gigya SAML site configuration.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.idp.setConfig+REST
     */
    public setConfig(params: BaseParams & any) {
        return this.gigya.request('fidm.saml.idp.setConfig', params);
    }
}

export default IdP;
