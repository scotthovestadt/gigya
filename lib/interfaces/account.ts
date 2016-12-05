import Profile from './profile';
import Identity from './identity';

export interface Account {
    UID: string;
    UIDSignature: string;
    signatureTimestamp: number;
    loginProvider: string;
    isRegistered: boolean;
    isActive: boolean;
    profile: Profile;
    data: any;
    iRank: number;
    loginIDs: {
        username: string;
        emails: Array<string>;
        unverifiedEmails: Array<string>;
    };
    password: {
        compoundHash: string;
        hash: string;
        hashSettings: {
            algorithm: string;
            rounds: number,
            salt: string;
            format: string;
            binaryFormat: string;
            url: string;
        };
    };
    socialProviders: string;
    identities: Array<Identity>;
    isVerified: boolean;
    verified: string;
    verifiedTimestamp: number;
    lastLogin: string;
    lastLoginTimestamp: number;
    lastUpdated: string;
    lastUpdatedTimestamp: number;
    created: string;
    createdTimestamp: number;
    regSource: string;
    lastLoginLocation?: {
        country?: string;
        state?: string;
        city?: string;
        coordinates?: {
            lat?: number;
            long?: number;
        }
    }
}

export default Account;
