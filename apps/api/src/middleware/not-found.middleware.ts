import { Request, Response, NextFunction } from "express";
import { AppError } from "@/errors/app-error";
import { ErrorCodes } from "@/errors/error-codes";

export function notFoundMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    next(
        new AppError(
            `Route ${req.method} ${req.originalUrl} not found`,
            404,
            ErrorCodes.ROUTE_NOT_FOUND
        )
    );
}