import Gigya from './gigya';
import GigyaResponse from './interfaces/gigya-response';
import BaseParams from './interfaces/base-params';

export * from './interfaces/gigya-response';
export * from './interfaces/base-params';

export class OP {
    constructor(protected gigya: Gigya) {
    }

    /**
     * This API deletes an existing OP configuration.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.oidc.op.clearConfig+REST
     */
    public clearConfig(params: BaseParams & any) {
        return this.gigya.request('fidm.oidc.op.clearConfig', params);
    }

    /**
     * This API registers and configures a new RP    for the OP .
     * 
     * @see http://developers.gigya.com/display/GD/fidm.oidc.op.createRP+REST
     */
    public createRP(params: BaseParams & any) {
        return this.gigya.request('fidm.oidc.op.createRP', params);
    }

    /**
     * This API deletes an existing OP configuration.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.oidc.op.delRP+REST
     */
    public delRP(params: BaseParams & any) {
        return this.gigya.request('fidm.oidc.op.delRP', params);
    }

    /**
     * This API retrieves the site OP  configuration relevant for all clients/relying-parties of the site.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.oidc.op.getConfig+REST
     */
    public getConfig(params: BaseParams & any) {
        return this.gigya.request('fidm.oidc.op.getConfig', params);
    }

    /**
     * This API returns the configuration data for a specified RP .
     * 
     * @see http://developers.gigya.com/display/GD/fidm.oidc.op.getRP+REST
     */
    public getRP(params: BaseParams & any) {
        return this.gigya.request('fidm.oidc.op.getRP', params);
    }

    /**
     * This API Returns all the currently registered RPs  for the OP .
     * 
     * @see http://developers.gigya.com/display/GD/fidm.oidc.op.getRPs+REST
     */
    public getRPs(params: BaseParams & any) {
        return this.gigya.request('fidm.oidc.op.getRPs', params);
    }

    /**
     * This API initiates the OP  functionality for your site. The configuration of the OP is relevant to all of the site's RPs .
     * 
     * @see http://developers.gigya.com/display/GD/fidm.oidc.op.setConfig+REST
     */
    public setConfig(params: BaseParams & any) {
        return this.gigya.request('fidm.oidc.op.setConfig', params);
    }

    /**
     * This API updates the configuration of an existing RP  configured on the OP.
     * 
     * @see http://developers.gigya.com/display/GD/fidm.oidc.op.updateRP+REST
     */
    public updateRP(params: BaseParams & any) {
        return this.gigya.request('fidm.oidc.op.updateRP', params);
    }
}

export default OP;
