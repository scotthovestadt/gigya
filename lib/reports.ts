import Gigya from './gigya';
import GigyaResponse from './interfaces/gigya-response';

export class Reports {
    constructor(protected gigya: Gigya) {
    }

    /**
     * This API retrieves Gigya's Accounts statistics.
     * 
     * @see http://developers.gigya.com/display/GD/reports.getAccountsStats+REST
     */
    public getAccountsStats(params: any) {
        return this.gigya.request<any>('reports.getAccountsStats', params);
    }

    /**
     * This API retrieves Gigya's comments statistics.
     * 
     * @see http://developers.gigya.com/display/GD/reports.getCommentsStats+REST
     */
    public getCommentsStats(params: any) {
        return this.gigya.request<any>('reports.getCommentsStats', params);
    }

    /**
     * This method retrieves the current total redeemable points across your user base, per challenge.
     * 
     * @see http://developers.gigya.com/display/GD/reports.getGMRedeemablePoints+REST
     */
    public getGMRedeemablePoints(params: any) {
        return this.gigya.request<any>('reports.getGMRedeemablePoints', params);
    }

    /**
     * This API retrieves Gigya's Game Mechanics statistics.
     * 
     * @see http://developers.gigya.com/display/GD/reports.getGMStats+REST
     */
    public getGMStats(params: any) {
        return this.gigya.request<any>('reports.getGMStats', params);
    }

    /**
     * This API retrieves the top Game Mechanics users.
     * 
     * @see http://developers.gigya.com/display/GD/reports.getGMTopUsers+REST
     */
    public getGMTopUsers(params: any) {
        return this.gigya.request<any>('reports.getGMTopUsers', params);
    }

    /**
     * This API retrieves the Gamification challenges and the number of users who participate in each challenge.
     * 
     * @see http://developers.gigya.com/display/GD/reports.getGMUserStats+REST
     */
    public getGMUserStats(params: any) {
        return this.gigya.request<any>('reports.getGMUserStats', params);
    }

    /**
     * This API retrieves the top influencers for the site.
     * 
     * @see http://developers.gigya.com/display/GD/reports.getIRank+REST
     */
    public getIRank(params: any) {
        return this.gigya.request<any>('reports.getIRank', params);
    }

    /**
     * This API retrieves Gigya's reactions statistics.
     * 
     * @see http://developers.gigya.com/display/GD/reports.getReactionsStats+REST
     */
    public getReactionsStats(params: any) {
        return this.gigya.request<any>('reports.getReactionsStats', params);
    }

    /**
     * This API retrieves Gigya's reporting data.
     * 
     * @see http://developers.gigya.com/display/GD/reports.getSocializeStats+REST
     */
    public getSocializeStats(params: any) {
        return this.gigya.request<any>('reports.getSocializeStats', params);
    }
}

export default Reports;
