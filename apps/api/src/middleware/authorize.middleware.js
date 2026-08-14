"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
const app_error_1 = require("@/errors/app-error");
const error_codes_1 = require("@/errors/error-codes");
function authorize(options = {}) {
    return (req, res, next) => {
        if (!req.user) {
            return next(new app_error_1.AppError("Unauthorized", 401, error_codes_1.ErrorCodes.UNAUTHORIZED));
        }
        const userRoles = req.user.roles ?? [];
        const userPermissions = req.user.permissions ?? [];
        const { roles = [], permissions = [], requireAllPermissions = false, } = options;
        // ROLE CHECK
        if (roles.length > 0) {
            const hasRequiredRole = userRoles.some((role) => roles.includes(role));
            if (!hasRequiredRole) {
                return next(new app_error_1.AppError("Forbidden", 403, error_codes_1.ErrorCodes.FORBIDDEN));
            }
        }
        // PERMISSION CHECK
        if (permissions.length > 0) {
            const hasRequiredPermission = requireAllPermissions
                ? permissions.every((permission) => userPermissions.includes(permission))
                : permissions.some((permission) => userPermissions.includes(permission));
            if (!hasRequiredPermission) {
                return next(new app_error_1.AppError("Forbidden", 403, error_codes_1.ErrorCodes.FORBIDDEN));
            }
        }
        next();
    };
}
