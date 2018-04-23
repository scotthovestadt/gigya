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
import BaseParams from './interfaces/base-params';

export * from './rba';
export * from './accounts.webhooks';
export * from './interfaces/account';
export * from './interfaces/session-info';
export * from './interfaces/gigya-response';
export * from './interfaces/target-env';
export * from './interfaces/session-expiration';
export * from './interfaces/counter';
export * from './interfaces/profile';
export * from './interfaces/base-params';

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
    public deleteAccount(params: BaseParams & AccountsDeleteAccountParams) {
        return this.gigya.request('accounts.deleteAccount', params);
    }

    /**
     * This method deletes a screen-set hosted by Gigya. 
     * 
     * @see http://developers.gigya.com/display/GD/accounts.deleteScreenSet+REST
     */
    public deleteScreenSet(params: BaseParams & AccountsDeleteScreenSetParams) {
        return this.gigya.request('accounts.deleteScreenSet', params);
    }

    /**
     * This method allows sites integrating 3rd party plugins to validate the UID of a logged-in user.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.exchangeUIDSignature+REST
     */
    public exchangeUIDSignature(params: BaseParams & AccountsExchangeUIDSignatureParams) {
        return this.gigya.request<AccountsExchangeUIDSignatureResponse>('accounts.exchangeUIDSignature', params);
    }

    /**
     * This method completes on-site user registration.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.finalizeRegistration+REST
     */
    public finalizeRegistration(params: BaseParams & AccountsFinalizeRegistrationParams) {
        return this.gigya.request<Account & SessionInfo>('accounts.finalizeRegistration', params);
    }

    /**
     * This method retrieves user account data.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getAccountInfo+REST
     */
    public getAccountInfo(params: BaseParams & AccountsGetAccountInfoParams) {
        return this.gigya.request<Account>('accounts.getAccountInfo', params);
    }

    /**
     * This method searches for a conflicting account: an account that uses the email associated with a social identity linked to the account currently logging in.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getConflictingAccount+REST
     */
    public getConflictingAccount(params: BaseParams & AccountsGetConflictingAccountParams) {
        return this.gigya.request<AccountsGetConflictingAccountResponse>('accounts.getConflictingAccount', params);
    }

    /**
     * This method retrieves the counters associated with a user ID (UID).
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getCounters+REST
     */
    public getCounters(params: BaseParams & AccountsGetCountersParams) {
        return this.gigya.request<AccountsGetCountersResponse>('accounts.getCounters', params);
    }

    /**
     * This API allows retrieval of the public key necessary for validating an id_token returned from the accounts.getJWT API endpoint.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getJWTPublicKey+REST
     */
    public getJWTPublicKey(params?: BaseParams) {
        return this.gigya.request<AccountsGetJWTPublicKeyResponse>('accounts.getJWTPublicKey', {});
    }

    /**
     * This API is used to obtain an OAuth2.0/OIDC compatible id_token containing an existing user's data.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getJWT+REST
     */
    public getJWT(params: BaseParams & AccountsGetJWTParams) {
        return this.gigya.request<AccountsGetJWTResponse>('accounts.getJWT', params);
    }

    /**
     * This method retrieves account policies.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getPolicies+REST
     */
    public getPolicies(params: BaseParams & AccountsGetPoliciesParams) {
        return this.gigya.request<AccountsGetPoliciesResponse>('accounts.getPolicies', params);
    }

    /**
     * This method returns the counters that were registered for the site using accounts.registerCounters.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getRegisteredCounters+REST
     */
    public getRegisteredCounters(params?: BaseParams) {
        return this.gigya.request<AccountsGetRegisteredCountersResponse>('accounts.getRegisteredCounters', {});
    }

    /**
     * This method retrieves the schema of the Profile object and the Data object (the site specific custom data object) in Gigya's Accounts Storage.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getSchema+REST
     */
    public getSchema(params?: BaseParams & AccountsGetSchemaParams) {
        return this.gigya.request<AccountsGetSchemaResponse>('accounts.getSchema', params);
    }

    /**
     * This method retrieves one or more screen-sets hosted by Gigya.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.getScreenSets+REST
     */
    public getScreenSets(params?: BaseParams & AccountsGetScreenSetsParams) {
        return this.gigya.request<AccountsGetScreenSetsResponse>('accounts.getScreenSets', params);
    }

    /**
     * This method retrieves Screenset's versions.
     *
     */
    public getScreenSetVersions(params?: BaseParams & AccountsGetScreenSetVersionsParams) {
        return this.gigya.request<AccountsGetScreenSetVersionsResponse>('accounts.getScreenSetVersions', params);
    }

    /**
     * This method imports user account data into the Accounts Storage.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.importAccount+REST
     */
    public importAccount(params: BaseParams & AccountsImportAccountParams) {
        return this.gigya.request<AccountsImportAccountResponse>('accounts.importAccount', params);
    }

    /**
     * This method imports a user's profile photo to Gigya's server.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.importProfilePhoto+REST
     */
    public importProfilePhoto(params: BaseParams & AccountsImportProfilePhotoParams) {
        return this.gigya.request('accounts.importProfilePhoto', params);
    }

    /**
     * When creating a custom counter, you first register it using accounts.registerCounters, then increment it using the current method.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.incrementCounters+REST
     */
    public incrementCounters(params: BaseParams & AccountsIncrementCountersParams) {
        return this.gigya.request('accounts.incrementCounters', params);
    }

    /**
     * This method initializes a registration process at a site.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.initRegistration+REST
     */
    public initRegistration(params?: BaseParams) {
        return this.gigya.request<AccountsInitRegistrationResponse>('accounts.initRegistration', {});
    }

    /**
     * This method checks whether a certain login identifier (username / email) is available.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.isAvailableLoginID+REST
     */
    public isAvailableLoginID(params: BaseParams & AccountsIsAvailableLoginIDParams) {
        return this.gigya.request<AccountsIsAvailableLoginIDResponse>('accounts.isAvailableLoginID', params);
    }

    /**
     * This method merges the account identified by the provided UID with the account identified by the provided login credentials (loginID + password).
     * 
     * @see http://developers.gigya.com/display/GD/accounts.linkAccounts+REST
     */
    public linkAccounts(params: BaseParams & AccountsLinkAccountsParams) {
        return this.gigya.request<Account & SessionInfo>('accounts.linkAccounts', params);
    }

    /**
     * This method logs a user into your site and opens a session for the logged-in user on success.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.login+REST
     */
    public login(params: BaseParams & AccountsLoginParams) {
        return this.gigya.request<Account & SessionInfo>('accounts.login', params);
    }

    /**
     * This method logs out the specified user of your site.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.logout+REST
     */
    public logout(params: BaseParams & AccountsLogoutParams) {
        return this.gigya.request<any>('accounts.logout', params);
    }

    /**
     * This method notifies Gigya of an external login that happened outside of the Accounts system.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.notifyLogin+REST
     */
    public notifyLogin(params: BaseParams & (AccountsNotifyLoginParamsSiteUID | AccountsNotifyLoginParamsProviderSessions)) {
        return this.gigya.request<Account & SessionInfo>('accounts.notifyLogin', params);
    }

    /**
     * This method publishes the last imported profile photo if it hadn't been published previously.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.publishProfilePhoto+REST
     */
    public publishProfilePhoto(params: BaseParams & AccountsPublishProfilePhotoParams) {
        return this.gigya.request('accounts.publishProfilePhoto', params);
    }

    /**
     * When creating a custom counter, you first register it using this method, then increment it using accounts.incrementCounters.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.registerCounters+REST
     */
    public registerCounters(params: BaseParams & AccountsRegisterCountersParams) {
        return this.gigya.request('accounts.registerCounters', params);
    }

    /**
     * This method registers a new user at your site, in accordance with the predefined site Policies and the Schema of the Accounts Storage.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.register+REST
     */
    public register(params: BaseParams & AccountsRegisterParams) {
        return this.gigya.request<Account & SessionInfo>('accounts.register', params);
    }

    /**
     * This method is used to resend a validation email to unverified addresses associated with the account.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.resendVerificationCode+REST
     */
    public resendVerificationCode(params: BaseParams & AccountsResendVerificationCodeParams) {
        return this.gigya.request('accounts.resendVerificationCode', params);
    }

    /**
     * This method resets a user's password, either via email or directly.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.resetPassword+REST
     */
    public resetPassword(params: BaseParams & AccountsResetPasswordParams) {
        return this.gigya.request<AccountsResetPasswordResponse>('accounts.resetPassword', params);
    }

    /**
     * Searches and retrieves data from Gigya's Accounts Storage using an SQL-like query.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.search+REST
     */
    public search(params: BaseParams & AccountsSearchParams) {
        return this.gigya.request<AccountsSearchResponse>('accounts.search', params);
    }

    /**
     * This method sets account data into a user's account.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.setAccountInfo+REST
     */
    public setAccountInfo(params: BaseParams & AccountsSetAccountInfoParams) {
        return this.gigya.request('accounts.setAccountInfo', params);
    }

    /**
     * This method is used to modify site policies regarding user registration and login.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.setPolicies+REST
     */
    public setPolicies(params: BaseParams & AccountsSetPoliciesParams) {
        return this.gigya.request('accounts.setPolicies', params);
    }

    /**
     * This method uploads a user's profile photo to Gigya's server.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.setProfilePhoto+REST
     */
    public setProfilePhoto(params: BaseParams & AccountsSetProfilePhotoParams) {
        return this.gigya.request('accounts.setProfilePhoto', params);
    }

    /**
     * This method enables you to specify a schema for Gigya's Accounts Storage.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.setSchema+REST
     */
    public setSchema(params: BaseParams & AccountsSetSchemaParams) {
        return this.gigya.request('accounts.setSchema', params);
    }

    /**
     * This method updates a screen-set hosted by Gigya, or creates it if it does not exist.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.setScreenSet+REST
     */
    public setScreenSet(params: BaseParams & AccountsSetScreenSetParams) {
        return this.gigya.request('accounts.setScreenSet', params);
    }

    /**
     * This method unregisters counters.
     * 
     * @see http://developers.gigya.com/display/GD/accounts.unregisterCounters+REST
     */
    public unregisterCounters(params: BaseParams & AccountsUnregisterCountersParams) {
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
    doubleOptIn: {
        nextURL: string;
        defaultLanguage: string;
        confirmationLinkExpiration: number;
        confirmationEmailTemplates: { [key: string]: string; };
    };
}

export type AccountsSetPoliciesParams = {
    accountOptions?: {
        verifyEmail?: boolean;
        verifyProviderEmail?: boolean;
        allowUnverifiedLogin?: boolean;
        loginIdentifiers?: string;
        defaultLanguage?: string;
        loginIdentifierConflict?: 'ignore' | 'failOnSiteConflictingIdentity' | 'failOnAnyConflictingIdentity';
        preventLoginIDHarvesting?: boolean;
        sendAccountDeletedEmail?: boolean;
        sendWelcomeEmail?: boolean;
        welcomeEmailTemplates?: { [key: string]: string; };
    } | null;
    emailNotifications?: {
        confirmationEmailTemplates?: { [key: string]: string; };
        accountDeletedEmailTemplates?: { [key: string]: string; };
        accountDeletedEmailDefaultLanguage?: string;
        confirmationEmailDefaultLanguage?: string;
    } | null;
    emailVerification?: {
        autoLogin?: boolean;
        nextURL?: string;
        nextURLMapping?: { [key: string]: string; };
        verificationEmailExpiration?: number;
        defaultLanguage?: string;
        emailTemplates?: { [key: string]: string; };
    } | null;
    gigyaPlugins?: {
        defaultRegScreenSet?: string;
        defaultMobileRegScreenSet?: string;
        sessionExpiration?: SessionExpiration;
        rememberSessionExpiration?: SessionExpiration;
    } | null;
    passwordComplexity?: {
        minCharGroups?: number;
        minLength?: number;
        regExp?: string;
    } | null;
    passwordReset?: {
        requireSecurityCheck?: boolean;
        securityFields?: Array<Array<string>>;
        resetURL?: string;
        tokenExpiration?: number;
        defaultLanguage?: string;
        emailTemplates?: { [key: string]: string; };
        sendConfirmationEmail?: boolean;
    } | null;
    profilePhoto?: {
        thumbnailWidth?: number;
        thumbnailHeight?: number;
    } | null;
    registration?: {
        requireCaptcha?: boolean;
        requireSecurityQuestion?: boolean;
        requireLoginID?: boolean;
        enforceCoppa?: boolean;
    } | null;
    security?: {
        accountLockout?: {
            failedLoginThreshold?: number;
            lockoutTimeSec?: number;
            failedLoginResetSec?: number;
        };
        captcha?: {
            failedLoginThreshold?: number;
        };
        ipLockout?: {
            hourlyFailedLoginThreshold?: number;
            lockoutTimeSec?: number;
        };
        passwordChangeInterval?: number;
        passwordHistorySize?: number;
    } | null;
    twoFactorAuth?: {
        providers?: Array<{
            name?: string;
            enabled?: boolean;
            params?: { [key: string]: string; };
        }>;
    } | null;
    federation?: {
        allowMultipleIdentities?: boolean;
    } | null;
}

export interface AccountsGetRegisteredCountersResponse {
    counters: Array<Counter>;
}

export interface AccountsSetAccountInfoParams {
    UID?: string;
    regToken?: string;
    addLoginEmails?: string;
    conflictHandling?: 'fail' | 'saveProfileAndFail';
    data?: any;
    subscriptions?: any;
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

export interface AccountsImportAccountParams {
    UID: string;
    username?: string;
    email?: string;
    secretQuestion?: string;
    secretAnswer?: string;
    profile?: Profile;
    data?: any;
    lang?: string;
    skipVerification?: boolean;
    finalizeRegistration?: boolean;
    created?: string;
    lastUpdated?: string;
    isActive?: boolean;
    regSource?: string;
    lastLogin?: string;
    compoundHashedPassword?: string;
    hashedPassword?: string;
    pwHashAlgorithm?: string;
    pwHashFormat?: string;
    pwHashBinaryFormat?: string;
    pwHashSalt?: string;
    pwHashRounds?: string;
    url?: string;
}

export interface AccountsImportAccountResponse {
    identityConflicts: Array<any>;
    isImported: boolean;
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
    subscriptions?: any;
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
    siteUID?: string;
    providerSessions?: { [key: string]: any; };
    cid?: string;
    targetEnv?: TargetEnv;
    regSource?: string;
    sessionExpiration?: SessionExpiration;
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
        fields: {
            [key: string]: AccountsProfileSetSchemaField;
        };
    };
    dataSchema?: {
        fields: {
            [key: string]: AccountsDataSetSchemaField;
        };
        dynamicSchema?: boolean;
    };
    subscriptionsSchema?: {
        fields: {
            [key: string]: AccountsSubscriptionSetSchemaField;
        };
    };
    preferencesSchema?: {
        fields: {
            [key: string]: AccountsPreferencesSetSchemaField;
        };
    };
    scope?: 'group' | 'site';
}
export interface AccountsProfileSetSchemaField {
    required?: boolean;
    writeAccess?: AccountsSchemaWriteAccess;
    languages?: Array<string>;
}
export interface AccountsDataSetSchemaField extends AccountsProfileSetSchemaField {
    allowNull?: boolean;
    encrypt?: AccountsSchemaEncrypt | null;
    format?: string | null;
    type?: AccountsSchemaType;
}
export interface AccountsSubscriptionSetSchemaField extends AccountsProfileSetSchemaField {
    doubleOptIn? : boolean;
    description? : string | null;
    type?: AccountsSchemaType;
}
export interface AccountsPreferencesSetSchemaField extends AccountsProfileSetSchemaField {
    type?: 'consent';
    currentDocDate?: string;
    minDocDate?: string;
    currentDocVersion?: number;
    minDocVersion?: number;
}
export interface AccountsGetSchemaParams {
    filter?: 'full' | 'explicitOnly' | 'clientOnly';
    scope?: 'effective' | 'group' | 'site';
    internalSchema?: boolean;
}
export interface AccountsGetSchemaResponse {
    profileSchema: {
        fields: {
            [key: string]: AccountsGetSchemaField;
        };
    };
    dataSchema: {
        fields: {
            [key: string]: AccountsGetSchemaField;
        };
    };
    subscriptionsSchema: {
        fields: {
            [key: string]: AccountsGetSchemaField;
        };
    };
    preferencesSchema: {
        fields: {
            [key: string]: AccountsPreferencesGetSchemaField;
        };
    };
}
export interface AccountsGetSchemaField {
    type: AccountsSchemaType;
    required: boolean;
    writeAccess: AccountsSchemaWriteAccess;
    allowNull: boolean;
    languages?: Array<string>;
    encrypt?: AccountsSchemaEncrypt;
    format?: string;
}
export interface AccountsPreferencesGetSchemaField {
    type: 'consent';
    required: boolean;
    writeAccess: AccountsSchemaWriteAccess;
    format?: string;
    currentDocDate?: string;
    minDocDate?: string;
    currentDocVersion?: number;
    minDocVersion?: number;
}

export interface ScreenSet {
    screenSetID: string;
    html: string;
    css: string;
    javascript?: string;
    translations?: {
        [languageCode: string]: {
            [translationKey: string]: string;
        }
    };
    metadata: {
        designerHtml?: string; // Set without designer HTML to disable UI Builder.
        desc?: string;
        targetEnv?: string;
        lastModified?: string;
        version?: number;
    };
}
export interface AccountsGetScreenSetsParams {
    screenSetIDs?: string | Array<string>;
    include?: string;
    version?: number;
}
export interface AccountsGetScreenSetsResponse {
    screenSets: Array<ScreenSet>;
}

export interface ScreenSetVersion {
    version: number;
    lastModified: number;
    comment: string;
    uiBuilderSupport: boolean;
}

export interface AccountsGetScreenSetVersionsParams {
    screenSetID: string;
    startVersion?: number;
    count?: number;
}

export interface AccountsGetScreenSetVersionsResponse {
    screenSetVersions: ScreenSetVersion[];
}

export interface AccountsIsAvailableLoginIDParams {
    loginID: string;
}
export interface AccountsIsAvailableLoginIDResponse {
    isAvailable: boolean;
}

export interface AccountsSetScreenSetParams {
    screenSetID: string;
    comment: string;
    html: string;
    css: string;
    javascript?: string;
    translations?: {
        [languageCode: string]: {
            [translationKey: string]: string;
        }
    };
    metadata?: {
        designerHtml?: string; // Set without designer HTML to disable UI Builder.
        desc?: string;
        targetEnv?: string;
        lastModified?: string;
    };
}

export interface AccountsUnregisterCountersParams {
    counters: Array<Counter>;
}

export default Accounts;


