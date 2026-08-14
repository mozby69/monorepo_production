"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = notFoundMiddleware;
const app_error_1 = require("@/errors/app-error");
const error_codes_1 = require("@/errors/error-codes");
function notFoundMiddleware(req, res, next) {
    next(new app_error_1.AppError(`Route ${req.method} ${req.originalUrl} not found`, 404, error_codes_1.ErrorCodes.ROUTE_NOT_FOUND));
}
