export interface BaseParamsSite {
    userKey?: string;
    secret?: string;
    dataCenter?: string
}

export interface BaseParams extends BaseParamsSite {
    apiKey?: string;
    oauth_token?: string;
}

export default BaseParams;
