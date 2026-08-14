import { Request, Response, NextFunction } from "express";
import { AppError } from "@/errors/app-error";
import { ErrorCodes } from "@/errors/error-codes";

// error-handler.middleware.ts

export function errorHandler(
    error: unknown,
    req: Request,
    res: Response,
    _next: NextFunction
) {
    if (error instanceof AppError) {
        req.log.warn(
            {
                code: error.code,
                statusCode: error.statusCode,
                requestId: req.id,
                path: req.originalUrl,
            },
            error.message
        );

        return res.status(error.statusCode).json({
            success: false,
            code: error.code,
            message: error.message,
        });
    }

    req.log.error(
        {
            err: error,
            requestId: req.id,
            userId: req.user?.id,
            method: req.method,
            path: req.originalUrl,
        },
        "Unhandled application error"
    );

    return res.status(500).json({
        success: false,
        code: ErrorCodes.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
    });
}