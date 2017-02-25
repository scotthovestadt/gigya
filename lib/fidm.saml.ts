import Gigya from './gigya';
import FidmSamlIdp from './fidm.saml.idp';
import GigyaResponse from './interfaces/gigya-response';
import BaseParams from './interfaces/base-params';
import SamlConfig from './interfaces/saml-config';
import ExternalIdP from './interfaces/external-idp';

export * from './fidm.saml.idp';
export * from './interfaces/gigya-response';
export * from './interfaces/base-params';
export * from './interfaces/saml-config';
export * from './interfaces/external-idp';

export class FidmSaml {
    public readonly idp: FidmSamlIdp;

    constructor(protected gigya: Gigya) {
        this.idp = new FidmSamlIdp(gigya);
    }

    /**
     * This API deletes a SAML Identity Provider (IdP).
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.delIdP+REST
     */
    public delIdP(params: BaseParams & FidmSamlDelIdPParams) {
        return this.gigya.request('fidm.saml.delIdP', params);
    }

    /**
     * This API retrieves the Gigya site configuration for SAML. 
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.getConfig+REST
     */
    public getConfig(params: BaseParams & FidmSamlGetConfigParams) {
        return this.gigya.request<FidmSamlGetConfigResponse>('fidm.saml.getConfig', params);
    }

    /**
     * This API retrieves all the SAML IdP configuration objects that are defined for the site.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.getRegisteredIdPs+REST
     */
    public getRegisteredIdPs(params?: BaseParams) {
        return this.gigya.request<FidmSamlGetRegisteredIdPsResponse>('fidm.saml.getRegisteredIdPs', params);
    }

    /**
     * This API imports a SAML Identity Provider (IdP) configuration from a SAML metadata XML.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.importIdPMetadata+REST
     */
    public importIdPMetadata(params: BaseParams & FidmSamlImportIdPMetadataParams) {
        return this.gigya.request<FidmSamlImportIdPMetadataResponse>('fidm.saml.importIdPMetadata', params);
    }

    /**
     * This API updates or registers a SAML configuration for a specific Identity Provider (IdP).
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.registerIdP+REST
     */
    public registerIdP(params: BaseParams & FidmSamlRegisterIdPParams) {
        return this.gigya.request('fidm.saml.registerIdP', params);
    }

    /**
     * This API updates the Gigya SAML site configuration.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.saml.setConfig+REST
     */
    public setConfig(params: BaseParams & FidmSamlSetConfigParams) {
        return this.gigya.request('fidm.saml.setConfig', params);
    }
}

export default FidmSaml;

export interface FidmSamlDelIdPParams {
    name: string;
}

export interface FidmSamlGetConfigParams {
    idpName?: string;
}
export interface FidmSamlGetConfigResponse {
    config: SamlConfig;
}

export interface FidmSamlGetRegisteredIdPsResponse {
    configs: Array<ExternalIdP>;
}

export interface FidmSamlImportIdPMetadataParams {
    metadata?: string;
    url?: string;
    saveConfiguration?: boolean;
    name?: string;
}
export interface FidmSamlImportIdPMetadataResponse {
    config: ExternalIdP;
}

export interface FidmSamlRegisterIdPParams {
    config: ExternalIdP;
}

export interface FidmSamlSetConfigParams {
    config: SamlConfig;
}
