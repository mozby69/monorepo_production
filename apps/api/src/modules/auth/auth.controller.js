"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = me;
exports.loginController = loginController;
exports.logout = logout;
exports.createUserController = createUserController;
exports.updateUserController = updateUserController;
exports.getRoleController = getRoleController;
exports.getPermissionController = getPermissionController;
exports.getUsersController = getUsersController;
exports.updateRolePermissionsController = updateRolePermissionsController;
const auth_config_1 = require("@/config/auth.config");
const response_1 = require("@/lib/http/response");
const service = __importStar(require("./auth.service"));
const shared_1 = require("@repo/shared");
const app_error_1 = require("@/errors/app-error");
const error_codes_1 = require("@/errors/error-codes");
async function me(req, res, next) {
    try {
        const user = await service.getAuthenticatedUser(req.user.id);
        return (0, response_1.sendSuccess)(res, user);
    }
    catch (error) {
        next(error);
    }
}
async function loginController(req, res, next) {
    try {
        const { token, user } = await service.loginUser(req.body);
        res.cookie(auth_config_1.authConfig.accessTokenCookie, token, {
            ...auth_config_1.authConfig.cookieOptions,
            maxAge: auth_config_1.authConfig.accessTokenCookieMaxAge,
        });
        return (0, response_1.sendSuccess)(res, user, {
            message: "Login successful",
        });
    }
    catch (error) {
        next(error);
    }
}
async function logout(req, res, next) {
    try {
        res.clearCookie(auth_config_1.authConfig.accessTokenCookie, auth_config_1.authConfig.cookieOptions);
        return (0, response_1.sendSuccess)(res, null, {
            message: "Logout successful",
        });
    }
    catch (error) {
        next(error);
    }
}
async function createUserController(req, res, next) {
    try {
        const parsed = shared_1.createUserSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new app_error_1.AppError("Validation failed", 400, error_codes_1.ErrorCodes.VALIDATION_ERROR);
        }
        const user = await service.createUserService(parsed.data);
        return (0, response_1.sendSuccess)(res, user, {
            statusCode: 201,
            message: "User created successfully",
        });
    }
    catch (error) {
        next(error);
    }
}
async function updateUserController(req, res, next) {
    const userId = Number(req.params.id);
    try {
        const userId = Number(req.params.id);
        if (Number.isNaN(userId)) {
            throw new app_error_1.AppError("Invalid user ID", 400, error_codes_1.ErrorCodes.VALIDATION_ERROR);
        }
        const parsed = shared_1.updateUserSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new app_error_1.AppError("Validation failed", 400, error_codes_1.ErrorCodes.VALIDATION_ERROR);
        }
        const user = await service.updateUserService(userId, parsed.data);
        return (0, response_1.sendSuccess)(res, user, {
            statusCode: 400,
            message: "User succesfully updated",
        });
    }
    catch (error) {
        next(error);
    }
}
async function getRoleController(req, res, next) {
    try {
        const roles = await service.getRoleService();
        return (0, response_1.sendSuccess)(res, roles, {
            message: "Roles fetched successfully",
        });
    }
    catch (error) {
        next(error);
    }
}
async function getPermissionController(req, res, next) {
    try {
        const permission = await service.getPermissionService();
        return (0, response_1.sendSuccess)(res, permission, {
            message: "Permission fetched successfully",
        });
    }
    catch (error) {
        next(error);
    }
}
async function getUsersController(req, res, next) {
    try {
        const users = await service.getUsersService();
        return (0, response_1.sendSuccess)(res, users, {
            message: "User fetched successfully",
        });
    }
    catch (error) {
        next(error);
    }
}
async function updateRolePermissionsController(req, res, next) {
    try {
        const roleId = Number(req.params.id);
        if (Number.isNaN(roleId)) {
            throw new app_error_1.AppError("Invalid role ID", 400, error_codes_1.ErrorCodes.VALIDATION_ERROR);
        }
        const parsed = shared_1.updateRolePermissionsSchema.safeParse(req.body);
        if (!parsed.success) {
            throw new app_error_1.AppError("Validation failed", 400, error_codes_1.ErrorCodes.VALIDATION_ERROR);
        }
        await service.updateRolePermissionsService(roleId, parsed.data.permissionIds);
        return (0, response_1.sendSuccess)(res, null, {
            message: "Permissions updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
}
