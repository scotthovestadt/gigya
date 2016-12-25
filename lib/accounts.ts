import Gigya from './gigya';
import RBA from './rba';
import Webhooks from './accounts.webhooks';
import Account from './interfaces/account';
import SessionInfo from './interfaces/session-info';
import GigyaResponse from './interfaces/gigya-response';
import TargetEnv from './interfaces/target-env';
import SessionExpiration from './interfaces/session-expiration';
import Counter from './interfaces/counter';
import Profile from './interfaces/profile';
import ScreenSet from './interfaces/screen-set';

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
        return this.gigya.request('accounts.deleteAccount', params);
    }

    /**
     * This method deletes a screen-set hosted by Gigya. 
     * 
     * @see http://developers.gigya.com/display/GD/accounts.deleteScreenSet+REST
     */
    public deleteScreenSet(params: AccountsDeleteScreenSetParams) {
        return this.gigya.request('accounts.deleteScreenSet', params);
    }

    /**
     * This method allows sites integrating 3rd party plugins to validate the UID of a logged-in user.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.exchangeUIDSignature+REST
     */
    public exchangeUIDSignature(params: AccountsExchangeUIDSignatureParams) {
        return this.gigya.request<AccountsExchangeUIDSignatureResponse>('accounts.exchangeUIDSignature', params);
    }

    /**
     * This method completes on-site user registration.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.finalizeRegistration+REST
     */
    public finalizeRegistration(params: AccountsFinalizeRegistrationParams) {
        return this.gigya.request<Account & SessionInfo>('accounts.finalizeRegistration', params);
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
    public getConflictingAccount(params: AccountsGetConflictingAccountParams) {
        return this.gigya.request<AccountsGetConflictingAccountResponse>('accounts.getConflictingAccount', params);
    }

    /**
     * This method retrieves the counters associated with a user ID (UID).
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getCounters+REST
     */
    public getCounters(params: AccountsGetCountersParams) {
        return this.gigya.request<AccountsGetCountersResponse>('accounts.getCounters', params);
    }

    /**
     * This API allows retrieval of the public key necessary for validating an id_token returned from the accounts.getJWT API endpoint.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getJWTPublicKey+REST
     */
    public getJWTPublicKey() {
        return this.gigya.request<AccountsGetJWTPublicKeyResponse>('accounts.getJWTPublicKey', {});
    }

    /**
     * This API is used to obtain an OAuth2.0/OIDC compatible id_token containing an existing user's data.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getJWT+REST
     */
    public getJWT(params: AccountsGetJWTParams) {
        return this.gigya.request<AccountsGetJWTResponse>('accounts.getJWT', params);
    }

    /**
     * This method retrieves account policies.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getPolicies+REST
     */
    public getPolicies(params: AccountsGetPoliciesParams) {
        return this.gigya.request<AccountsGetPoliciesResponse>('accounts.getPolicies', params);
    }

    /**
     * This method returns the counters that were registered for the site using accounts.registerCounters.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getRegisteredCounters+REST
     */
    public getRegisteredCounters() {
        return this.gigya.request<AccountsGetRegisteredCountersResponse>('accounts.getRegisteredCounters', {});
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
    public importProfilePhoto(params: AccountsImportProfilePhotoParams) {
        return this.gigya.request('accounts.importProfilePhoto', params);
    }

    /**
     * When creating a custom counter, you first register it using accounts.registerCounters, then increment it using the current method.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.incrementCounters+REST
     */
    public incrementCounters(params: AccountsIncrementCountersParams) {
        return this.gigya.request('accounts.incrementCounters', params);
    }

    /**
     * This method initializes a registration process at a site.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.initRegistration+REST
     */
    public initRegistration() {
        return this.gigya.request<AccountsInitRegistrationResponse>('accounts.initRegistration', {});
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
    public linkAccounts(params: AccountsLinkAccountsParams) {
        return this.gigya.request<Account & SessionInfo>('accounts.linkAccounts', params);
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
    public notifyLogin(params: AccountsNotifyLoginParams | AccountsNotifyLoginParamsProviderSessions) {
        return this.gigya.request<Account & SessionInfo>('accounts.notifyLogin', params);
    }

    /**
     * This method publishes the last imported profile photo if it hadn't been published previously.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.publishProfilePhoto+REST
     */
    public publishProfilePhoto(params: AccountsPublishProfilePhotoParams) {
        return this.gigya.request('accounts.publishProfilePhoto', params);
    }

    /**
     * When creating a custom counter, you first register it using this method, then increment it using accounts.incrementCounters.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.registerCounters+REST
     */
    public registerCounters(params: AccountsRegisterCountersParams) {
        return this.gigya.request('accounts.registerCounters', params);
    }

    /**
     * This method registers a new user at your site, in accordance with the predefined site Policies and the Schema of the Accounts Storage.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.register+REST
     */
    public register(params: AccountsRegisterParams) {
        return this.gigya.request<Account & SessionInfo>('accounts.register', params);
    }

    /**
     * This method is used to resend a validation email to unverified addresses associated with the account.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.resendVerificationCode+REST
     */
    public resendVerificationCode(params: AccountsResendVerificationCodeParams) {
        return this.gigya.request('accounts.resendVerificationCode', params);
    }

    /**
     * This method resets a user's password, either via email or directly.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.resetPassword+REST
     */
    public resetPassword(params: AccountsResetPasswordParams) {
        return this.gigya.request<AccountsResetPasswordResponse>('accounts.resetPassword', params);
    }

    /**
     * Searches and retrieves data from Gigya's Accounts Storage using an SQL-like query.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.search+REST
     */
    public search(params: AccountsSearchParams) {
        return this.gigya.request<AccountsSearchResponse>('accounts.search', params);
    }

    /**
     * This method sets account data into a user's account.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.setAccountInfo+REST
     */
    public setAccountInfo(params: AccountsSetAccountInfoParams) {
        return this.gigya.request('accounts.setAccountInfo', params);
    }

    /**
     * This method is used to modify site policies regarding user registration and login.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.setPolicies+REST
     */
    public setPolicies(params: AccountsSetPoliciesParams) {
        return this.gigya.request('accounts.setPolicies', params);
    }

    /**
     * This method uploads a user's profile photo to Gigya's server.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.setProfilePhoto+REST
     */
    public setProfilePhoto(params: AccountsSetProfilePhotoParams) {
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
    public setScreenSet(params: ScreenSet) {
        return this.gigya.request('accounts.setScreenSet', params);
    }

    /**
     * This method unregisters counters.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.unregisterCounters+REST
     */
    public unregisterCounters(params: AccountsUnregisterCountersParams) {
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

export interface AccountsExchangeUIDSignatureParams {
    UID: string;
    UIDSignature: string;
    signatureTimestamp: string;
    userKey: string;
}
export interface AccountsExchangeUIDSignatureResponse {
    UID: string;
    UIDSignature: string;
    signatureTimestamp: string;
}

export interface AccountsFinalizeRegistrationParams {
    regToken: string;
    include?: string;
    allowAccountsLinking?: boolean;
    targetEnv: TargetEnv;
}

export interface AccountsGetAccountInfoParams {
    UID?: string;
    regToken?: string;
    include?: Array<string> | string;
    extraProfileFields?: Array<string> | string;
}

export interface AccountsGetConflictingAccountParams {
    regToken: string;
}
export interface AccountsGetConflictingAccountResponse {
    conflictingAccount: {
        loginProviders: Array<string>;
    }
    loginID: string;
}

export interface AccountsGetCountersParams {
    UID?: string;
    regToken?: string;
    counters: Array<Counter>;
}
export interface AccountsGetCountersResponse {
    counters: Array<Counter>;
}

export interface AccountsGetJWTPublicKeyResponse {
    kty: string;
    alg: string;
    use: string;
    kid: string;
    n: string;
    e: string;
}

export interface AccountsGetJWTParams {
    targetUID: string;
    fields?: string;
    expiration?: number;
}
export interface AccountsGetJWTResponse {
    id_token: string;
    ignoredFields: string;
}

export interface AccountsGetPoliciesParams {
    sections?: string;
    filter?: 'full' | 'explicitOnly';
}

export interface AccountsGetPoliciesResponse {
    accountOptions: {
        verifyEmail: boolean;
        verifyProviderEmail: boolean;
        allowUnverifiedLogin: boolean;
        loginIdentifiers: string;
        defaultLanguage: string;
        loginIdentifierConflict: 'ignore' | 'failOnSiteConflictingIdentity' | 'failOnAnyConflictingIdentity';
        preventLoginIDHarvesting: boolean;
        sendAccountDeletedEmail: boolean;
        sendWelcomeEmail: boolean;
        welcomeEmailTemplates: { [key: string]: string; };
    };
    emailNotifications: {
        confirmationEmailTemplates: { [key: string]: string; };
        accountDeletedEmailTemplates: { [key: string]: string; };
        accountDeletedEmailDefaultLanguage: string;
        confirmationEmailDefaultLanguage: string;
    };
    emailVerification: {
        autoLogin: boolean;
        nextURL: string;
        nextURLMapping: { [key: string]: string; };
        verificationEmailExpiration: number;
        defaultLanguage: string;
        emailTemplates: { [key: string]: string; };
    };
    gigyaPlugins: {
        defaultRegScreenSet: string;
        defaultMobileRegScreenSet: string;
        sessionExpiration: SessionExpiration;
        rememberSessionExpiration: SessionExpiration;
    };
    passwordComplexity: {
        minCharGroups: number;
        minLength: number;
        regExp: string;
    };
    passwordReset: {
        requireSecurityCheck: boolean;
        securityFields: Array<Array<string>>;
        resetURL: string;
        tokenExpiration: number;
        defaultLanguage: string;
        emailTemplates: { [key: string]: string; };
        sendConfirmationEmail: boolean;
    };
    profilePhoto: {
        thumbnailWidth: number;
        thumbnailHeight: number;
    };
    registration: {
        requireCaptcha: boolean;
        requireSecurityQuestion: boolean;
        requireLoginID: boolean;
        enforceCoppa: boolean;
    };
    security: {
        accountLockout: {
            failedLoginThreshold: number;
            lockoutTimeSec: number;
            failedLoginResetSec: number;
        };
        captcha: {
            failedLoginThreshold: number;
        };
        ipLockout: {
            hourlyFailedLoginThreshold: number;
            lockoutTimeSec: number;
        };
        passwordChangeInterval: number;
        passwordHistorySize: number;
    };
    twoFactorAuth: {
        providers: Array<{
            name: string;
            enabled: boolean;
            params: { [key: string]: string; };
        }>;
    };
    federation: {
        allowMultipleIdentities: boolean;
    };
}

export type DeepPartial<T> = {
    [P in keyof T]?: Partial<T[P]>;
};
export type AccountsSetPoliciesParams = DeepPartial<AccountsGetPoliciesResponse>;

export interface AccountsGetRegisteredCountersResponse {
    counters: Array<Counter>;
}

export interface AccountsSetAccountInfoParams {
    UID?: string;
    regToken?: string;
    addLoginEmails?: string;
    conflictHandling?: 'fail' | 'saveProfileAndFail';
    data?: any;
    isActive?: boolean;
    isLockedOut?: boolean;
    isVerified?: boolean;
    newPassword?: string;
    password?: string;
    profile?: Profile;
    removeLoginEmails?: string;
    requirePasswordChange?: boolean;
    secretAnswer?: string;
    secretQuestion?: string;
    securityOverride?: boolean;
    rba?: {
        riskPolicy: string;
        riskPolicyLocked: boolean;
    };
    username?: string;
    created?: string;
    regSource?: string;
}

export interface AccountsImportProfilePhotoParams {
    url: string;
    UID?: string;
    regToken?: string;
    publish?: boolean;
}

export interface AccountsIncrementCountersParams {
    UID?: string;
    regToken?: string;
    counters: Array<Counter>;
}

export interface AccountsInitRegistrationResponse {
    regToken: string;
}

export interface AccountsLinkAccountsParams {
    UID?: string;
    regToken?: string;
    loginID: string;
    password: string;
    include?: string;
    targetEnv: TargetEnv;
}

export interface AccountsPublishProfilePhotoParams {
    UID?: string;
    regToken?: string;
    thumbnail?: string;
}

export interface AccountsRegisterCountersParams {
    counters: Array<Counter>;
}

export interface AccountsRegisterParams {
    username?: string;
    email?: string;
    password: string;
    regToken: string;
    profile?: Profile;
    captchaText?: string;
    captchaToken?: string;
    cid?: string;
    data?: any;
    finalizeRegistration?: boolean;
    secretQuestion?: string;
    secretAnswer?: string;
    lang?: string;
    targetEnv: TargetEnv;
    include?: string;
    sessionExpiration?: SessionExpiration;
    siteUID?: string;
    regSource?: string;
}

export interface AccountsResendVerificationCodeParams {
    UID?: string;
    regToken?: string;
    email?: string;
}

export interface AccountsResetPasswordParams {
    loginID: string;
    passwordResetToken: string;
    newPassword: string;
    secretAnswer: string;
    securityFields: string;
    email?: string;
    lang?: string;
    sendEmail?: string;
}
export interface AccountsResetPasswordResponse {
    secretQuestion?: string;
    passwordResetToken?: string;
    emails?: {
        verified: Array<string>;
        unverified: Array<string>;
    };
    UID?: string;
}

export interface AccountsSearchParams {
    query?: string;
    querySig?: string;
    expTime?: number;
    openCursor?: boolean;
    cursorId?: string;
    timeout?: number;
    restrictedQuery?: string;
}
export interface AccountsSearchResponse {
    results: Array<Account>;
    nextCursorId?: string;
    objectsCount: number;
    totalCount: number;
}

export interface AccountsSetProfilePhotoParams {
    UID?: string;
    regToken?: string;
    photoBytes?: string;
    publish?: boolean;
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
    siteUID: string;
    providerSessions?: { [key: string]: any; };
    cid?: string;
    targetEnv?: TargetEnv;
    regSource?: string;
    sessionExpiration?: number;
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
    screenSets: Array<Partial<ScreenSet>>;
}

export interface AccountsIsAvailableLoginIDParams {
    loginID: string;
}
export interface AccountsIsAvailableLoginIDResponse {
    isAvailable: boolean;
}

export interface AccountsUnregisterCountersParams {
    counters: Array<Counter>;
}

export default Accounts;


