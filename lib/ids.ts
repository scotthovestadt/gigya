import Gigya from './gigya';
import GigyaResponse from './interfaces/gigya-response';

export class IDS {
    constructor(protected gigya: Gigya) {
    }

    /**
     * This method deletes the specified user's account from Gigya's database.
     * 
     * @see http://developers.gigya.com/display/GD/ids.deleteAccount+REST
     */
    public deleteAccount(params: any) {
        return this.gigya.request('ids.deleteAccount', params);
    }

    /**
     * This API retrieves user account data.
     * 
     * @see http://developers.gigya.com/display/GD/ids.getAccountInfo+REST
     */
    public getAccountInfo(params: any) {
        return this.gigya.request<any>('ids.getAccountInfo', params);
    }

    /**
     * This API retrieves the counters associated with a user ID (UID).
     * 
     * @see http://developers.gigya.com/display/GD/ids.getCounters+REST
     */
    public getCounters(params: any) {
        return this.gigya.request<any>('ids.getCounters', params);
    }

    /**
     * This API returns the counters that were registered for the site using ids.registerCounters.
     * 
     * @see http://developers.gigya.com/display/GD/ids.getRegisteredCounters+REST
     */
    public getRegisteredCounters(params: any) {
        return this.gigya.request<any>('ids.getRegisteredCounters', params);
    }

    /**
     * This API retrieves the schema of the Profile object and the Data object (the site specific custom data object) in Gigya's Profile Management.
     * 
     * @see http://developers.gigya.com/display/GD/ids.getSchema+REST
     */
    public getSchema(params: any) {
        return this.gigya.request<any>('ids.getSchema', params);
    }

    /**
     * This API increments counters by a specific count and also optionally provides a value for the count.
     * 
     * @see http://developers.gigya.com/display/GD/ids.incrementCounters+REST
     */
    public incrementCounters(params: any) {
        return this.gigya.request('ids.incrementCounters', params);
    }

    /**
     * This API registers custom counters that can then be incremented using ids.incrementCounters.
     * 
     * @see http://developers.gigya.com/display/GD/ids.registerCounters+REST
     */
    public registerCounters(params: any) {
        return this.gigya.request('ids.registerCounters', params);
    }

    /**
     * Searches and retrieves data from Gigya's Profile Management (IDS) using an SQL-like query.
     * 
     * @see http://developers.gigya.com/display/GD/ids.search+REST
     */
    public search(params: any) {
        return this.gigya.request<any>('ids.search', params);
    }

    /**
     * This API sets account data into a user's account.
     * 
     * @see http://developers.gigya.com/display/GD/ids.setAccountInfo+REST
     */
    public setAccountInfo(params: any) {
        return this.gigya.request('ids.setAccountInfo', params);
    }

    /**
     * This API allows specifying a schema for Profile Management.
     * 
     * @see http://developers.gigya.com/display/GD/ids.setSchema+REST
     */
    public setSchema(params: any) {
        return this.gigya.request('ids.setSchema', params);
    }

    /**
     * This API de-registers counters.
     * 
     * @see http://developers.gigya.com/display/GD/ids.unregisterCounters+REST
     */
    public unregisterCounters(params: any) {
        return this.gigya.request('ids.unregisterCounters', params);
    }
}

export default IDS;
