import Gigya from './gigya';
import GigyaResponse from './interfaces/gigya-response';
import BaseParams from './interfaces/base-params';

export * from './interfaces/gigya-response';
export * from './interfaces/base-params';

export class IDX {
    constructor(protected gigya: Gigya) {
    }

    /**
     * The method creates a single dataflow and saves it in the system.
     * 
     * @see http://developers.gigya.com/display/GD/idx.createDataflow+REST
     */
    public createDataflow(params: BaseParams & any) {
        return this.gigya.request<any>('idx.createDataflow', params);
    }

    /**
     * The method retrieves a dataflow by ID.
     * 
     * @see http://developers.gigya.com/display/GD/idx.getDataflow+REST
     */
    public getDataflow(params: BaseParams & any) {
        return this.gigya.request<any>('idx.getDataflow', params);
    }

    /**
     * This method modifies an existing dataflow.
     * 
     * @see http://developers.gigya.com/display/GD/idx.setDataflow+REST
     */
    public setDataflow(params: BaseParams & any) {
        return this.gigya.request<any>('idx.setDataflow', params);
    }

    /**
     * The method deletes a Dataflow by ID.
     * 
     * @see http://developers.gigya.com/display/GD/idx.deleteDataflow+REST
     */
    public deleteDataflow(params: BaseParams & IDXDeleteDataflowParams) {
        return this.gigya.request('idx.deleteDataflow', params);
    }

    /**
     * The method schedules a dataflow to execute.
     * 
     * @see http://developers.gigya.com/display/GD/idx.createScheduling+REST
     */
    public createScheduling(params: BaseParams & any) {
        return this.gigya.request<any>('idx.createScheduling', params);
    }

    /**
     * The method retrieves a scheduling.
     * 
     * @see http://developers.gigya.com/display/GD/idx.getScheduling+REST
     */
    public getScheduling(params: BaseParams & any) {
        return this.gigya.request<any>('idx.getScheduling', params);
    }

    /**
     * The method modifies an existing scheduling.
     * 
     * @see http://developers.gigya.com/display/GD/idx.setScheduling+REST
     */
    public setScheduling(params: BaseParams & any) {
        return this.gigya.request<any>('idx.setScheduling', params);
    }

    /**
     * The method deletes a scheduling.
     * 
     * @see http://developers.gigya.com/display/GD/idx.deleteScheduling+REST
     */
    public deleteScheduling(params: BaseParams & IDXDeleteSchedulingParams) {
        return this.gigya.request('idx.deleteScheduling', params);
    }

    /**
     * Searches and retrieves data from the ETL service using an SQL-like query.
     * 
     * @see http://developers.gigya.com/display/GD/idx.search+REST
     */
    public search(params: BaseParams & IDXSearchParams) {
        return this.gigya.request<any>('idx.search', params);
    }
}

export interface IDXDeleteDataflowParams {
    id: string;
}

export interface IDXDeleteSchedulingParams {
    id: string;
}

export interface IDXSearchParams {
    query: string;
    openCursor?: boolean;
    cursorId?: string;
}
export interface IDXSearchResponse {
    resultCount: number;
    totalCount: number;
    result: Array<any>;
}

export default IDX;
