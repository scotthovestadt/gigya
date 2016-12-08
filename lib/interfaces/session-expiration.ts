export type SessionExpiration = SessionExpirationEnum | 0 | -1 | -2;

export enum SessionExpirationEnum {
    SESSION = 0,
    DYNAMIC = -1,
    FOREVER = -2
}

export default SessionExpiration;
