import GigyaResponse from './interfaces/gigya-response';

export * from './interfaces/gigya-response';

export class GigyaError extends Error {
    public gigyaResponse: GigyaResponse;
    public errorCode: number;
    public params: any;
} 

export default GigyaError;
