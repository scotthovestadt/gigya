import GigyaResponse from './interfaces/gigya-response';

export class GigyaError extends Error {
    public gigyaResponse: GigyaResponse;
    public errorCode: number;
    public params: Object;
} 

export default GigyaError;
