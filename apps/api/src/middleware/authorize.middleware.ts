import { Request, Response, NextFunction } from "express";

import { AppError } from "@/errors/app-error";
import { ErrorCodes } from "@/errors/error-codes";

type AuthorizationOptions = {
    roles?: string[];
    permissions?: string[];
    requireAllPermissions?: boolean;
};

export function authorize(options: AuthorizationOptions = {}) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        if (!req.user) {
            return next(
                new AppError(
                    "Unauthorized",
                    401,
                    ErrorCodes.UNAUTHORIZED
                )
            );
        }

        const userRoles = req.user.roles ?? [];
        const userPermissions = req.user.permissions ?? [];

        const {
            roles = [],
            permissions = [],
            requireAllPermissions = false,
        } = options;

        // ROLE CHECK
        if (roles.length > 0) {
            const hasRequiredRole = userRoles.some((role) =>
                roles.includes(role)
            );

            if (!hasRequiredRole) {
                return next(
                    new AppError(
                        "Forbidden",
                        403,
                        ErrorCodes.FORBIDDEN
                    )
                );
            }
        }

        // PERMISSION CHECK
        if (permissions.length > 0) {
            const hasRequiredPermission = requireAllPermissions
                ? permissions.every((permission) =>
                    userPermissions.includes(permission)
                )
                : permissions.some((permission) =>
                    userPermissions.includes(permission)
                );

            if (!hasRequiredPermission) {
                return next(
                    new AppError(
                        "Forbidden",
                        403,
                        ErrorCodes.FORBIDDEN
                    )
                );
            }
        }

        next();
    };
}