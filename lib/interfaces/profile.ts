import Gender from './gender';
import Education from './education';
import Phone from './phone';
import Like from './like';
import Work from './work';

export interface Profile {
    firstName?: string;
    lastName?: string;
    nickname?: string;
    address?: string;
    bio?: string;
    birthDay?: number;
    birthMonth?: number;
    birthYear?: number;
    city?: string;
    country?: string;
    education?: Array<Education>;
    email?: string;
    gender: Gender,
    hometown?: string;
    industry?: string;
    interestedIn?: string;
    languages?: string;
    locale?: string;
    name?: string;
    phones?: Array<Phone>;
    photoURL?: string;
    politicalView?: string;
    professionalHeadline?: string;
    profileURL?: string;
    relationshipStatus?: string;
    religion?: string;
    specialities?: string;
    state?: string;
    timezone?: string;
    thumbnailURL?: string;
    company?: string;
    username?: string;
    work?: Array<Work>;
    zip?: string;
}

export default Profile;
