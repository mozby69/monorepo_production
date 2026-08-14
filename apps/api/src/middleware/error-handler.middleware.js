"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const app_error_1 = require("@/errors/app-error");
const error_codes_1 = require("@/errors/error-codes");
// error-handler.middleware.ts
function errorHandler(error, req, res, _next) {
    if (error instanceof app_error_1.AppError) {
        req.log.warn({
            code: error.code,
            statusCode: error.statusCode,
            requestId: req.id,
            path: req.originalUrl,
        }, error.message);
        return res.status(error.statusCode).json({
            success: false,
            code: error.code,
            message: error.message,
        });
    }
    req.log.error({
        err: error,
        requestId: req.id,
        userId: req.user?.id,
        method: req.method,
        path: req.originalUrl,
    }, "Unhandled application error");
    return res.status(500).json({
        success: false,
        code: error_codes_1.ErrorCodes.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
    });
}
