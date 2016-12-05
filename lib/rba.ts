import Gigya from './gigya';
import GigyaResponse from './interfaces/gigya-response';

export class RBA {
    constructor(protected gigya: Gigya) {
    }

    /**
     * This API gets the RBA (Risk-Based Authentication) policy for a site or master site of a group.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.rba.getPolicy
     */
    public getPolicy(params: any) {
        return this.gigya.request<any>('accounts.rba.getPolicy', params);
    }

    /**
     * This API sets the RBA (Risk-Based Authentication) policy for a site or master site of a group.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.rba.setPolicy
     */
    public setPolicy(params: any) {
        return this.gigya.request<any>('accounts.rba.setPolicy', params);
    }

    /**
     * This API unlocks either the specified user's account or the specified IP, depending upon which parameters are passed.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.rba.unlock
     */
    public unlock(params: any) {
        return this.gigya.request<any>('accounts.rba.unlock', params);
    }
}

export default RBA;
