import Gigya from './gigya';
import GigyaResponse from './interfaces/gigya-response';
import BaseParams from './interfaces/base-params';
import Gender from './interfaces/gender';
import TargetEnv from './interfaces/target-env';
import SessionExpiration from './interfaces/session-expiration';

export * from './interfaces/gigya-response';
export * from './interfaces/base-params';
export * from './interfaces/gender';
export * from './interfaces/target-env';
export * from './interfaces/session-expiration';

export class Socialize {
    constructor(protected gigya: Gigya) {
    }

    /**
     * This API deletes the specified user's account from Gigya's database.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.deleteAccount+REST
     */
    public deleteAccount(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.deleteAccount', params);
    }

    /**
     * Utility API for deleting user's settings in Gigya's database.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.delUserSettings+REST
     */
    public delUserSettings(params: BaseParams & any) {
        return this.gigya.request('socialize.delUserSettings', params);
    }

    /**
     * This API allows sites integrating 3rd party plugins to validate the UID of a logged-in user.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.exchangeUIDSignature+REST
     */
    public exchangeUIDSignature(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.exchangeUIDSignature', params);
    }
    
    /**
     * A generic method for making calls to the Facebook Graph API.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.facebookGraphOperation+REST
     */
    public facebookGraphOperation(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.facebookGraphOperation ', params);
    }

    /**
     * Returns the list of email contacts of the current user, from all the providers that support retrieving contacts.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.getContacts+REST
     */
    public getContacts(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.getContacts', params);
    }

    /**
     * Returns information about friends of the current user.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.getFriendsInfo+REST
     */
    public getFriendsInfo(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.getFriendsInfo', params);
    }

    /**
     * Enables retrieving raw data directly from the provider.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.getRawData+REST
     */
    public getRawData(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.getRawData', params);
    }

    /**
     * The method retrieves the number of times certain reaction buttons were clicked.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.getReactionsCount+REST
     */
    public getReactionsCount(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.getReactionsCount', params);
    }

    /**
     * Returns the session information required for making direct API calls to the providers.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.getSessionInfo+REST
     */
    public getSessionInfo(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.getSessionInfo', params);
    }

    /**
     * This method allows you to see the content (URLs) most shared on a site in the recent defined time period (up to 7 days).
     * 
     * @see http://developers.gigya.com/display/GD/socialize.getTopShares+REST
     */
    public getTopShares(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.getTopShares', params);
    }

    /**
     * This method retrieves extended information regarding a user.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.getUserInfo+REST
     */
    public getUserInfo(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.getUserInfo', params);
    }

    /**
     * Utility method for retrieving user's settings from Gigya's database.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.getUserSettings+REST
     */
    public getUserSettings(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.getUserSettings', params);
    }

    /**
     * This method enables you to import a social user into Gigya.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.importIdentities+REST
     */
    public importIdentities(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.importIdentities', params);
    }

    /**
     * This method increments or reduces by one the counter of a given reaction button in a specified reactions bar.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.incrementReactionsCount+REST
     */
    public incrementReactionsCount(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.incrementReactionsCount', params);
    }

    /**
     * This method logs the current user out of Gigya's Platform.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.logout+REST
     */
    public logout(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.logout', params);
    }

    /**
     * The socialize.notifyLogin API method notifies the Gigya service that the user has been logged in by the site.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.notifyLogin+REST
     */
    public notifyLogin(params: BaseParams & (SocializeNotifyLoginParamsSiteUID | SocializeNotifyLoginParamsProviderSessions)) {
        return this.gigya.request<SocializeNotifyLoginResponse>('socialize.notifyLogin', params);
    }

    /**
     * This method notifies the Gigya service that the user has completed the registration process at your site.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.notifyRegistration+REST
     */
    public notifyRegistration(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.notifyRegistration', params);
    }

    /**
     * Publishes a user action to the newsfeed of all the connected providers.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.publishUserAction+REST
     */
    public publishUserAction(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.publishUserAction', params);
    }

    /**
     * Connects new provider to the current user.
     *
     * @see http://developers.gigya.com/display/GD/socialize.addConnection+REST
     */
    public addConnection(params: BaseParams & any) {
        return this.gigya.request('socialize.addConnection', params);
    }

    /**
     * Disconnects the current user from one or all of the connected providers.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.removeConnection+REST
     */
    public removeConnection(params: BaseParams & any) {
        return this.gigya.request('socialize.removeConnection', params);
    }

    /**
     * This method sets the user's status in social networks that support this feature.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.setStatus+REST
     */
    public setStatus(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.setStatus', params);
    }

    /**
     * This method replaces the Gigya UID in the user account on Gigya's DB, with a site user ID that you provide.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.setUID+REST
     */
    public setUID(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.setUID', params);
    }

    /**
     * This method updates a user's site information.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.setUserInfo+REST
     */
    public setUserInfo(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.setUserInfo', params);
    }

    /**
     * Utility method for storing the current user's settings in Gigya's database.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.setUserSettings+REST
     */
    public setUserSettings(params: BaseParams & any) {
        return this.gigya.request<any>('socialize.setUserSettings', params);
    }

    /**
     * This utility method provides access to a URL shortening service.
     * 
     * @see http://developers.gigya.com/display/GD/socialize.shortenURL+REST
     */
    public shortenURL(params: BaseParams & SocializeShortenURLParams) {
        return this.gigya.request<SocializeShortenURLResponse>('socialize.shortenURL', params);
    }
}

export interface SocializeNotifyLoginParamsBase {
    siteUID?: string;
    providerSessions?: { [key: string]: any; };
    actionAttributes?: { [key: string]: string; };
    cid?: string;
    newUser?: boolean;
    regSource?: string;
    sessionExpiration?: SessionExpiration;
    targetEnv?: TargetEnv;
    userInfo?: {
        firstName?: string;
        lastName?: string;
        gender?: Gender;
        photoURL?: string;
        thumbnailURL?: string;
        nickname?: string;
        age?: number;
    }
}
export interface SocializeNotifyLoginParamsSiteUID extends SocializeNotifyLoginParamsBase {
    siteUID: string;
}
export interface SocializeNotifyLoginParamsProviderSessions extends SocializeNotifyLoginParamsBase {
    providerSessions: { [key: string]: any; };
}

export interface SocializeNotifyLoginResponse {
    UID: string;
    UIDSignature: string;
    signatureTimestamp: string;
    
    // targetEnv desktop
    cookieName?: string;
    cookieValue?: string;
    cookieDomain?: string;
    cookiePath?: '/';

    // targetEnv mobile
    sessionToken?: string;
    sessionSecret?: string;

    // When accounts is enabled and the user is pending registration
    regToken?: string;
}

export interface SocializeShortenURLParams {
    url: string;
    cid?: string;
}

export interface SocializeShortenURLResponse {
    shortURL: string;
}

export default Socialize;
