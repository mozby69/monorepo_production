import type { ErrorCode } from "./error-codes";

export class AppError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public code: ErrorCode
    ) {
        super(message);

        this.name = "AppError";

        Error.captureStackTrace(this, this.constructor);
    }
}