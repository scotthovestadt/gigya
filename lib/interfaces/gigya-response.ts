export interface GigyaResponse {
    callId: string;
    statusCode: number;
    statusReason: string;
    time: string;
    errorCode: number;
    errorMessage?: string;
    errorDetails?: string;
    validationErrors?: Array<{
        fieldName: string;
        message: string;
    }>;
}

export default GigyaResponse;
