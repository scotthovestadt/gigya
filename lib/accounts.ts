import Gigya from './gigya';
import RBA from './rba';
import Webhooks from './accounts.webhooks';
import Account from './interfaces/account';
import SessionInfo from './interfaces/session-info';
import GigyaResponse from './interfaces/gigya-response';
import TargetEnv from './interfaces/target-env';
import SessionExpiration from './interfaces/session-expiration';

export class Accounts {
    public readonly rba: RBA;
    public readonly webhooks: Webhooks;

    constructor(protected gigya: Gigya) {
        this.rba = new RBA(gigya);
        this.webhooks = new Webhooks(gigya);
    }

    /**
     * This method deletes the specified user's account from Gigya's database.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.deleteAccount+REST
     */
    public deleteAccount(params: AccountsDeleteAccountParams) {
        return this.gigya.request<any>('accounts.deleteAccount', params);
    }

    /**
     * This method deletes a screen-set hosted by Gigya. 
     * 
     * @see http://developers.gigya.com/display/GD/accounts.deleteScreenSet+REST
     */
    public deleteScreenSet(params: AccountsDeleteScreenSetParams) {
        return this.gigya.request<any>('accounts.deleteScreenSet', params);
    }

    /**
     * This method allows sites integrating 3rd party plugins to validate the UID of a logged-in user.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.exchangeUIDSignature+REST
     */
    public exchangeUIDSignature(params: any) {
        return this.gigya.request<any>('accounts.exchangeUIDSignature', params);
    }

    /**
     * This method completes on-site user registration.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.finalizeRegistration+REST
     */
    public finalizeRegistration(params: any) {
        return this.gigya.request<any>('accounts.finalizeRegistration', params);
    }

    /**
     * This method retrieves user account data.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getAccountInfo+REST
     */
    public getAccountInfo(params: AccountsGetAccountInfoParams) {
        return this.gigya.request<Account>('accounts.getAccountInfo', params);
    }

    /**
     * This method searches for a conflicting account: an account that uses the email associated with a social identity linked to the account currently logging in.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getConflictingAccount+REST
     */
    public getConflictingAccount(params: any) {
        return this.gigya.request<any>('accounts.getConflictingAccount', params);
    }

    /**
     * This method retrieves the counters associated with a user ID (UID).
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getCounters+REST
     */
    public getCounters(params: any) {
        return this.gigya.request<any>('accounts.getCounters', params);
    }

    /**
     * This method retrieves account policies.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getPolicies+REST
     */
    public getPolicies(params: any) {
        return this.gigya.request<any>('accounts.getPolicies', params);
    }

    /**
     * This method returns the counters that were registered for the site using accounts.registerCounters.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getRegisteredCounters+REST
     */
    public getRegisteredCounters(params: any) {
        return this.gigya.request<any>('accounts.getRegisteredCounters', params);
    }

    /**
     * This method retrieves the schema of the Profile object and the Data object (the site specific custom data object) in Gigya's Accounts Storage.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getSchema+REST
     */
    public getSchema(params?: AccountsGetSchemaParams) {
        return this.gigya.request<AccountsGetSchemaResponse>('accounts.getSchema', params);
    }

    /**
     * This method retrieves one or more screen-sets hosted by Gigya.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getScreenSets+REST
     */
    public getScreenSets(params?: GetScreenSetsParams) {
        return this.gigya.request<GetScreenSetsResponse>('accounts.getScreenSets', params);
    }

    /**
     * This method imports a user's profile photo to Gigya's server.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.importProfilePhoto+REST
     */
    public importProfilePhoto(params: any) {
        return this.gigya.request('accounts.importProfilePhoto', params);
    }

    /**
     * When creating a custom counter, you first register it using accounts.registerCounters, then increment it using the current method.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.incrementCounters+REST
     */
    public incrementCounters(params: any) {
        return this.gigya.request('accounts.incrementCounters', params);
    }

    /**
     * This method initializes a registration process at a site.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.initRegistration+REST
     */
    public initRegistration(params: any) {
        return this.gigya.request<any>('accounts.initRegistration', params);
    }

    /**
     * This method checks whether a certain login identifier (username / email) is available.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.isAvailableLoginID+REST
     */
    public isAvailableLoginID(params: AccountsIsAvailableLoginIDParams) {
        return this.gigya.request<AccountsIsAvailableLoginIDResponse>('accounts.isAvailableLoginID', params);
    }

    /**
     * This method merges the account identified by the provided UID with the account identified by the provided login credentials (loginID + password).
     * 
     * @see http://developers.gigya.com/display/GD/accounts.linkAccounts+REST
     */
    public linkAccounts(params: any) {
        return this.gigya.request<any>('accounts.linkAccounts', params);
    }

    /**
     * This method logs a user into your site and opens a session for the logged-in user on success.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.login+REST
     */
    public login(params: AccountsLoginParams) {
        return this.gigya.request<Account & SessionInfo>('accounts.login', params);
    }

    /**
     * This method logs out the specified user of your site.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.logout+REST
     */
    public logout(params: AccountsLogoutParams) {
        return this.gigya.request<any>('accounts.logout', params);
    }

    /**
     * This method notifies Gigya of an external login that happened outside of the Accounts system.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.notifyLogin+REST
     */
    public notifyLogin(params: AccountsNotifyLoginParamsSiteUID | AccountsNotifyLoginParamsProviderSessions) {
        return this.gigya.request<Account & SessionInfo>('accounts.notifyLogin', params);
    }

    /**
     * This method publishes the last imported profile photo if it hadn't been published previously.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.publishProfilePhoto+REST
     */
    public publishProfilePhoto(params: any) {
        return this.gigya.request<any>('accounts.publishProfilePhoto', params);
    }

    /**
     * When creating a custom counter, you first register it using this method, then increment it using accounts.incrementCounters.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.registerCounters+REST
     */
    public registerCounters(params: any) {
        return this.gigya.request<any>('accounts.registerCounters', params);
    }

    /**
     * This method registers a new user at your site, in accordance with the predefined site Policies and the Schema of the Accounts Storage.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.register+REST
     */
    public register(params: any) {
        return this.gigya.request<any>('accounts.register', params);
    }

    /**
     * This method is used to resend a validation email to unverified addresses associated with the account.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.resendVerificationCode+REST
     */
    public resendVerificationCode(params: any) {
        return this.gigya.request('accounts.resendVerificationCode', params);
    }

    /**
     * This method resets a user's password, either via email or directly.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.resetPassword+REST
     */
    public resetPassword(params: any) {
        return this.gigya.request('accounts.resetPassword', params);
    }

    /**
     * Searches and retrieves data from Gigya's Accounts Storage using an SQL-like query.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.search+REST
     */
    public search(params: any) {
        return this.gigya.request<any>('accounts.search', params);
    }

    /**
     * This method sets account data into a user's account.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.setAccountInfo+REST
     */
    public setAccountInfo(params: any) {
        return this.gigya.request('accounts.setAccountInfo', params);
    }

    /**
     * This method is used to modify site policies regarding user registration and login.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.setPolicies+REST
     */
    public setPolicies(params: any) {
        return this.gigya.request('accounts.setPolicies', params);
    }

    /**
     * This method uploads a user's profile photo to Gigya's server.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.setProfilePhoto+REST
     */
    public setProfilePhoto(params: any) {
        return this.gigya.request('accounts.setProfilePhoto', params);
    }

    /**
     * This method enables you to specify a schema for Gigya's Accounts Storage.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.setSchema+REST
     */
    public setSchema(params: AccountsSetSchemaParams) {
        return this.gigya.request('accounts.setSchema', params);
    }

    /**
     * This method updates a screen-set hosted by Gigya, or creates it if it does not exist.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.setScreenSet+REST
     */
    public setScreenSet(params: any) {
        return this.gigya.request('accounts.setScreenSet', params);
    }

    /**
     * This method unregisters counters.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.unregisterCounters+REST
     */
    public unregisterCounters(params: any) {
        return this.gigya.request('accounts.unregisterCounters', params);
    }
}

export interface AccountsDeleteAccountParams {
    UID: string;
    cid?: string;
}

export interface AccountsDeleteScreenSetParams {
    screenSetID: string;
}

export interface AccountsGetAccountInfoParams {
    UID?: string;
    regToken?: string;
    include?: Array<string> | string;
    extraProfileFields?: Array<string> | string;
}

export interface AccountsLoginParams {
    loginID: string;
    password: string;
    captchaToken?: string;
    captchaText?: string;
    actionAttributes?: { [key: string]: string; };
    cid?: string;
    include?: Array<string> | string;
    loginMode?: 'standard' | 'link' | 'reAuth';
    sessionExpiration?: SessionExpiration;
    targetEnv?: TargetEnv;
}

export interface AccountsLogoutParams {
    UID: string;
    cid?: string;
}

export interface AccountsNotifyLoginParams {
    siteUID?: string;
    providerSessions?: { [key: string]: any; };
    cid?: string;
    targetEnv?: TargetEnv;
    regSource?: string;
}
export interface AccountsNotifyLoginParamsSiteUID extends AccountsNotifyLoginParams {
    siteUID: string;
}
export interface AccountsNotifyLoginParamsProviderSessions extends AccountsNotifyLoginParams {
    providerSessions: { [key: string]: any; };
}

export type AccountsSchemaWriteAccess = 'serverOnly' | 'clientCreate' | 'clientModify';
export type AccountsSchemaType = 'integer' | 'long' | 'float' | 'basic-string' | 'string' | 'text' | 'date' | 'boolean';
export type AccountsSchemaEncrypt = 'AES' | '';
export interface AccountsSetSchemaParams {
    profileSchema?: {
        fields: { [key: string]: AccountsProfileSetSchemaField | null; }
    };
    dataSchema?: {
        fields: { [key: string]: AccountsDataSetSchemaField | null; };
        dynamicSchema?: boolean;
    }
    scope?: 'group' | 'site';
}
export interface AccountsProfileSetSchemaField {
    required?: boolean;
    writeAccess?: AccountsSchemaWriteAccess;
    languages?: Array<string>;
}
export interface AccountsDataSetSchemaField extends AccountsProfileSetSchemaField {
    allowNull?: boolean;
    encrypt?: AccountsSchemaEncrypt;
    format?: string;
    type?: AccountsSchemaType;
}

export interface AccountsGetSchemaParams {
    filter?: 'full' | 'explicitOnly' | 'clientOnly';
    scope?: 'effective' | 'group' | 'site';
}
export interface AccountsGetSchemaResponse {
    profileSchema: {
        fields: { [key: string]: AccountsProfileGetSchemaField; }
    };
    dataSchema: {
        fields: { [key: string]: AccountsDataGetSchemaField; };
    }
}
export interface AccountsProfileGetSchemaField {
    required: boolean;
    writeAccess: AccountsSchemaWriteAccess;
    languages?: Array<string>;
}
export interface AccountsDataGetSchemaField extends AccountsProfileSetSchemaField {
    allowNull?: boolean;
    encrypt?: AccountsSchemaEncrypt;
    format?: string;
    type: AccountsSchemaType;
}

export interface GetScreenSetsParams {
    screenSetIDs?: string | Array<string>;
    include?: string;
}
export interface GetScreenSetsResponse {
    screenSets: Array<{
        screenSetID: string;
        html: string;
        css: string;
        metadata: {
            desc?: string;
            designerHtml: string;
            targetEnv: string;
            lastModified?: string;
            version?: number;
        };
    }>;
}

export interface AccountsIsAvailableLoginIDParams {
    loginID: string;
}
export interface AccountsIsAvailableLoginIDResponse {
    isAvailable: boolean;
}

export default Accounts;


