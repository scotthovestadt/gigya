import Gigya from './gigya';
import GigyaResponse from './interfaces/gigya-response';
import BaseParams from './interfaces/base-params';

export * from './interfaces/gigya-response';
export * from './interfaces/base-params';

export class FidmOidcRp {
    constructor(protected gigya: Gigya) {
    }

    /**
     * This API registers and configures a new OP for the RP.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.oidc.rp.createOP+REST
     */
    public createOP(params: BaseParams & FidmOidcRpCreateOPParams) {
        return this.gigya.request('fidm.oidc.rp.createOP', params);
    }

    /**
     * This API deletes the specified OP from the RP.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.oidc.rp.delOP+REST
     */
    public delOP(params: BaseParams & FidmOidcRpDelOPParams) {
        return this.gigya.request('fidm.oidc.rp.delOP', params);
    }

    /**
     * This API returns the configuration data for a specified OP.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.oidc.rp.getOP+REST
     */
    public getOP(params: BaseParams & FidmOidcRpGetOPParams) {
        return this.gigya.request<FidmOidcRpGetOPResponse>('fidm.oidc.rp.getOP', params);
    }

    /**
     * This API returns all the currently registered OPs for RP.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.oidc.rp.getOPs+REST
     */
    public getOPs(params?: BaseParams) {
        return this.gigya.request<FidmOidcRpGetOPsResponse>('fidm.oidc.rp.getOPs', params);
    }

    /**
     * This API updates the configuration of an existing OP  configured on the RP.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.oidc.rp.updateOP+REST
     */
    public updateOP(params: BaseParams & any) {
        return this.gigya.request('fidm.oidc.rp.updateOP', params);
    }
}

export interface OpenIDProviderBasic {
    providerName: string;
    authorizeEndpoint: string;
}

export interface OpenIDProvider extends OpenIDProviderBasic {
    clientID: string;
    clientSecret: string;
    tokenEndpoint: string;
    userInfoEndpoint: string;
    scopes: string;
    issuer: string;
    jwks: string;
}

export interface FidmOidcRpCreateOPParams extends OpenIDProvider {
}

export interface FidmOidcRpDelOPParams {
    providerName: string;
}

export interface FidmOidcRpGetOPParams {
    providerName: string;
}
export interface FidmOidcRpGetOPResponse extends OpenIDProvider {
}

export interface FidmOidcRpGetOPsResponse {
    OPs: Array<OpenIDProviderBasic>;
}

export interface FidmOidcRpUpdateOPParams {
    providerName: string;
    authorizeEndpoint?: string;
    clientID?: string;
    clientSecret?: string;
    tokenEndpoint?: string;
    userInfoEndpoint?: string;
    scopes?: string;
    issuer?: string;
    jwks?: string;
}

export default FidmOidcRp;
