"use strict";
// access-control.service.ts
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
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.getRoles = getRoles;
exports.createRole = createRole;
exports.updateRole = updateRole;
exports.getPermissions = getPermissions;
exports.updateRolePermissions = updateRolePermissions;
const app_error_1 = require("@/errors/app-error");
const error_codes_1 = require("@/errors/error-codes");
const password_service_1 = require("../../auth/internal/password.service");
const accessControlRepository = __importStar(require("./access-control.repository"));
const access_control_mapper_1 = require("./access-control.mapper");
async function getUsers(params) {
    const users = await accessControlRepository.findAllUsers(params);
    return {
        data: users.data.map(access_control_mapper_1.mapUser),
        pagination: users.pagination,
    };
}
async function createUser(params) {
    const { name, username, email, password, roleIds, } = params;
    const duplicate = await accessControlRepository.findDuplicateUser(username, email);
    if (duplicate) {
        throw new app_error_1.AppError("Username or email already exists", 409, error_codes_1.ErrorCodes.USER_ALREADY_EXISTS);
    }
    const hashedPassword = await (0, password_service_1.hashPassword)(password);
    const user = await accessControlRepository.createUser({
        name,
        username,
        email,
        password: hashedPassword,
        roleIds,
    });
    return user;
}
async function updateUser(userId, params) {
    const user = await accessControlRepository.findUserById(userId);
    if (!user) {
        throw new app_error_1.AppError("User not found", 404, error_codes_1.ErrorCodes.USER_NOT_FOUND);
    }
    const { password, ...rest } = params;
    let hashedPassword;
    if (password) {
        hashedPassword =
            await (0, password_service_1.hashPassword)(password);
    }
    const updatedUser = await accessControlRepository.updateUser(userId, {
        ...rest,
        ...(hashedPassword && {
            password: hashedPassword,
        }),
    });
    return updatedUser;
}
/* =====================
   ROLES
===================== */
async function getRoles() {
    const roles = await accessControlRepository.findAllRoles();
    return roles.map(access_control_mapper_1.mapRole);
}
async function createRole(params) {
    return accessControlRepository.createRole(params);
}
async function updateRole(roleId, params) {
    const role = await accessControlRepository.findRoleById(roleId);
    if (!role) {
        throw new app_error_1.AppError("Role not found", 404, error_codes_1.ErrorCodes.ROLE_NOT_FOUND);
    }
    return accessControlRepository.updateRole(roleId, params);
}
/* =====================
   PERMISSIONS
===================== */
async function getPermissions() {
    return accessControlRepository.findAllPermissions();
}
async function updateRolePermissions(roleId, params) {
    const role = await accessControlRepository.findRoleById(roleId);
    if (!role) {
        throw new app_error_1.AppError("Role not found", 404, error_codes_1.ErrorCodes.ROLE_NOT_FOUND);
    }
    await accessControlRepository.updateRolePermissions(roleId, params.permissionIds);
    return {
        message: "Permissions updated successfully",
    };
}
