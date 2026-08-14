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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticatedUser = void 0;
exports.loginUser = loginUser;
exports.createUserService = createUserService;
exports.updateUserService = updateUserService;
exports.getRoleService = getRoleService;
exports.getPermissionService = getPermissionService;
exports.getUsersService = getUsersService;
exports.updateRolePermissionsService = updateRolePermissionsService;
const authRepository = __importStar(require("./auth.repository"));
const app_error_1 = require("@/errors/app-error");
const error_codes_1 = require("@/errors/error-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_service_1 = require("./internal/token.service");
const password_service_1 = require("./internal/password.service");
const auth_mapper_1 = require("./auth.mapper");
const getAuthenticatedUser = async (userId) => {
    const user = await authRepository.findByIdWithRoles(userId);
    if (!user) {
        throw new app_error_1.AppError("User not found", 404, error_codes_1.ErrorCodes.USER_NOT_FOUND);
    }
    return (0, auth_mapper_1.mapAuthenticatedUser)(user);
};
exports.getAuthenticatedUser = getAuthenticatedUser;
async function loginUser(params) {
    const { username, password } = params;
    const user = await authRepository.findByUsernameWithRoles(username);
    if (!user || !user.isActive) {
        throw new app_error_1.AppError("Invalid username or password", 401, error_codes_1.ErrorCodes.INVALID_CREDENTIALS);
    }
    const isPasswordValid = await (0, password_service_1.verifyPassword)(password, user.password);
    if (!isPasswordValid) {
        throw new app_error_1.AppError("Invalid username or password", 401, error_codes_1.ErrorCodes.INVALID_CREDENTIALS);
    }
    const authenticatedUser = (0, auth_mapper_1.mapAuthenticatedUser)(user);
    const token = (0, token_service_1.generateAccessToken)({
        id: user.id,
        username: user.username,
        roles: authenticatedUser.roles,
        permissions: authenticatedUser.permissions
    });
    return {
        token,
        user: authenticatedUser
    };
}
async function createUserService(data) {
    const { email, name, username, password, } = data;
    // Check if username/email already exists
    const existingUser = await authRepository.findExistingUser({
        username,
        email,
    });
    if (existingUser) {
        throw new app_error_1.AppError("User already exists", 400, error_codes_1.ErrorCodes.USER_ALREADY_EXISTS);
    }
    // Hash password
    const hashedPassword = await bcrypt_1.default.hash(password, 12);
    // Create user + roles in a transaction
    const user = await authRepository.createUserWithRoles({
        email,
        name,
        username,
        password: hashedPassword
    });
    // Never expose password
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        isActive: user.isActive,
        createdAt: user.createdAt,
    };
}
async function updateUserService(userId, data) {
    // Check if user exists
    const existingUser = await authRepository.findById(userId);
    if (!existingUser) {
        throw new app_error_1.AppError("User not found", 404, error_codes_1.ErrorCodes.USER_NOT_FOUND);
    }
    // Check username/email conflicts
    const duplicateUser = await authRepository.findDuplicateUser({
        userId,
        username: data.username,
        email: data.email,
    });
    if (duplicateUser) {
        throw new app_error_1.AppError("Username or email already exists", 400, error_codes_1.ErrorCodes.USER_ALREADY_EXISTS);
    }
    // Validate roles if provided
    if (data.roleIds) {
        const roles = await authRepository.findRolesByIds(data.roleIds);
        if (roles.length !== data.roleIds.length) {
            throw new app_error_1.AppError("Invalid role selected", 400, error_codes_1.ErrorCodes.INVALID_ROLE);
        }
    }
    // Hash password only when provided
    let hashedPassword;
    if (data.password) {
        hashedPassword = await bcrypt_1.default.hash(data.password, 12);
    }
    // Update user + roles
    const user = await authRepository.updateUserWithRoles(userId, {
        email: data.email,
        name: data.name,
        username: data.username,
        password: hashedPassword,
        roleIds: data.roleIds,
        isActive: data.isActive,
    });
    // Never return password
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        isActive: user.isActive,
        createdAt: user.createdAt,
    };
}
async function getRoleService() {
    const roles = await authRepository.findAllRoles();
    return roles.map((role) => ({
        id: role.id,
        name: role.name,
        description: role.description,
        permissions: role.permissions.map((item) => item.permission.code),
    }));
}
// permission.service.ts
async function getPermissionService() {
    return authRepository.findAllPermissions();
}
async function getUsersService() {
    return authRepository.findAllUsers();
}
async function updateRolePermissionsService(roleId, permissionIds) {
    // business rules here
    const role = await authRepository.findById(roleId);
    if (!role) {
        throw new app_error_1.AppError("Role not found", 404, error_codes_1.ErrorCodes.ROLE_NOT_FOUND);
    }
    // validate permissions, etc.
    return authRepository.updatePermissions(roleId, permissionIds);
}
