export interface GigyaResponse {
    errorCode: number;
    errorMessage?: string;
    errorDetails?: string;
    validationErrors?: Array<{
        fieldName: string;
        message: string;
    }>;
}

export default GigyaResponse;
