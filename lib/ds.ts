import Gigya from './gigya';
import GigyaResponse from './interfaces/gigya-response';

export class DS {
    constructor(protected gigya: Gigya) {
    }

    /**
     * Deletes object data or an entire object from Gigya's Data Store.
     * 
     * @see http://developers.gigya.com/display/GD/ds.delete+REST
     */
    public delete(params: DSDeleteParams) {
        return this.gigya.request('ds.delete', params);
    }

    /**
     * Retrieves an object's or the specified datum from Gigya's Data Store.
     * 
     * @see http://developers.gigya.com/display/GD/ds.get+REST
     */
    public get(params: DSGetParams) {
        return this.gigya.request<DSObject>('ds.get', params);
    }

    /**
     * This method retrieves the schema of a specified data type in Gigya's Data Store (DS).
     * 
     * @see http://developers.gigya.com/display/GD/ds.getSchema+REST
     */
    public getSchema(params: any) {
        return this.gigya.request('ds.getSchema', params);
    }

    /**
     * Searches and retrieves data from Gigya's Data Store (DS) using an SQL-like query.
     * 
     * @see http://developers.gigya.com/display/GD/ds.search+REST
     */
    public search(params: DSSearchParams) {
        return this.gigya.request<DSSearchResponse>('ds.search', params);
    }

    /**
     * This method allows specifying a schema for a data type in Gigya's Data Store (DS).
     * 
     * @see http://developers.gigya.com/display/GD/ds.setSchema+REST
     */
    public setSchema(params: any) {
        return this.gigya.request('ds.setSchema', params);
    }

    /**
     * Stores an object data in Gigya's Data Store (DS).
     * 
     * @see http://developers.gigya.com/display/GD/ds.store+REST
     */
    public store(params: any) {
        return this.gigya.request('ds.setSchema', params);
    }
}

export interface DSObject {
    oid: string;
    lastUpdated: number;
    lastUpdatedTime: string;
    created: number;
    createdTime: string;
    data: any;
}

export interface DSDeleteParams extends DSGetParams {
}

export interface DSGetParams {
    oid: string;
    type: string;
    fields?: string;
    UID?: string;
}

export interface DSSearchParams {
    query: string;
    openCursor?: boolean;
    cursorId?: boolean;
    timeout?: number;
}

export interface DSSearchResponse {
    objectsCount: number;
    totalCount: number;
    results: Array<DSObject>;
    nextCursorId?: string;
}

export default DS;
