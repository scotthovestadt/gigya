import BaseParams from "../interfaces/base-params";
import {Headers} from "request";

export interface FormatJsonRequest {
    format: 'json'
}

export type BaseRequest = { [key: string]: string | null | number | boolean };

export type RequestParams<P = BaseRequest> =
    FormatJsonRequest & P;

export type UserParams = BaseParams & BaseRequest;

export interface GigyaRequest<P = BaseRequest> {
    host: string;
    endpoint: string;
    params: RequestParams<P>
    headers: Headers;
}

export abstract class RequestFactory<P = BaseRequest> {
    public abstract create(endpoint: string, userParams: UserParams): GigyaRequest<P>;
}