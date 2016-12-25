export type SessionExpiration = number;

export enum SessionExpirationEnum {
    SESSION = 0,
    DYNAMIC = -1,
    FOREVER = -2
}

export default SessionExpiration;
