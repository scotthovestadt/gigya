export interface SessionInfo {
    sessionInfo?: {
        // targetEnv browser
        cookieName: string;
        cookieValue: string;

        // targetEnv mobile
        sessionToken: string;
        sessionSecret: string;
    }

    // When pending registration
    regToken?: string;
}

export default SessionInfo;
