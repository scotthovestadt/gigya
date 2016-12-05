import Gender from './gender';
import Education from './education';
import Phone from './phone';
import Like from './like';
import Work from './work';

export interface Identity {
    provider?: string;
    providerUID?: string;
    providerUIDSig?: string;
    mappedProviderUIDs?: Array<{
        providerUID: string;
        apiKey: string;
    }>
    isLoginIdentity?: Boolean,
    nickname?: string;
    allowsLogin: Boolean,
    lastLoginTime: string;
    photoURL?: string;
    thumbnailURL?: string;
    firstName?: string;
    lastName?: string;
    gender: Gender,
    birthDay?: number;
    birthMonth?: number;
    birthYear?: number;
    email?: string;
    country?: string;
    state?: string;
    city?: string;
    zip?: string;
    profileURL?: string;
    languages?: string;
    address?: string;
    phones?: Array<Phone>;
    education?: Array<Education>
    honors?: string;
    professionalHeadline?: string;
    bio?: string;
    industry?: string;
    specialties?: string;
    religion?: string;
    politicalView?: string;
    interestedIn?: Array<string>;
    relationshipStatus?: string;
    hometown?: string;
    likes?: Array<Like>;
    favorites?: Object;
    followersCount?: number;
    followingCount?: number;
    username?: string;
    locale?: string;
    verified?: boolean;
    timezone?: string;
    missingPermissions?: string;
    samlData?: Object;
    work?: Array<Work>;
}

export default Identity;
