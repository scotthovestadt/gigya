import Gigya from './gigya';
import GigyaResponse from './interfaces/gigya-response';

export class Audit {
    constructor(protected gigya: Gigya) {
    }

    /**
     * The method enables you to search your site's audit log using an SQL-like query.
     * 
     * @see http://developers.gigya.com/display/GD/audit.search
     */
    public search(params: AuditSearchParams) {
        return this.gigya.request<AuditSearchResponse>('audit.search', params);
    }
}

export interface AuditSearchParams {
    query: string;
}

export interface AuditSearchResponse {
    objectsCount: number;
    totalCount: number;
    results: Array<{
        '@timestamp': string;
        callID: string;
        errCode: string;
        endpoint: string;
        errMessage: string;
        userKey: string;
        sourceIP: string;
        params: Object;
        uid: string;
        apikey: string;
        httpReq: {
            SDK: string;
            country: string;
        };
        userKeyDetails?: {
            description: string;
            name: string;
            emailDomain: string;
        };
    }>;
}

export default Audit;
