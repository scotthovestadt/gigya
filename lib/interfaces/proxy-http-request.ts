import GigyaResponse from '../interfaces/gigya-response';
import {Headers} from 'request';

export type ProxyHttpRequest = <R>(endpoint: string, dataCenter: string, requestParams: { [key: string]: string | null | number | boolean; }, headers?: Headers ) => Promise<GigyaResponse & R>;

export default ProxyHttpRequest;
