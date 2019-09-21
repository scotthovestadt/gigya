export type DataCenter = 'us1'|'eu1'|'au1'|'ru1'|'cn1'|'il1';

export interface BaseParamsSite {
    userKey?: string;
    secret?: string;
    dataCenter?: DataCenter
}

export interface BaseParams extends BaseParamsSite {
    apiKey?: string;
    oauth_token?: string;
}

export default BaseParams;
