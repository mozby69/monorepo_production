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
exports.getUsersController = getUsersController;
exports.createUserController = createUserController;
exports.updateUserController = updateUserController;
exports.getRolesController = getRolesController;
exports.createRoleController = createRoleController;
exports.updateRoleController = updateRoleController;
exports.getPermissionsController = getPermissionsController;
exports.updateRolePermissionsController = updateRolePermissionsController;
const response_1 = require("@/lib/http/response");
const service = __importStar(require("./access-control.service"));
async function getUsersController(req, res, next) {
    try {
        const result = await service.getUsers({
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            search: typeof req.query.search === "string"
                ? req.query.search.trim()
                : undefined,
            role: typeof req.query.role === "string"
                ? req.query.role
                : undefined,
            status: typeof req.query.status === "string"
                ? req.query.status
                : undefined,
            sort: typeof req.query.sort === "string"
                ? req.query.sort
                : undefined,
        });
        (0, response_1.sendSuccess)(res, result.data);
    }
    catch (error) {
        next(error);
    }
}
async function createUserController(req, res, next) {
    try {
        const result = await service.createUser(req.body);
        (0, response_1.sendSuccess)(res, result, {
            statusCode: 201,
            message: "User created successfully",
        });
    }
    catch (error) {
        next(error);
    }
}
async function updateUserController(req, res, next) {
    try {
        const result = await service.updateUser(Number(req.params.userId), req.body);
        (0, response_1.sendSuccess)(res, result, {
            statusCode: 200,
            message: "User updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
}
async function getRolesController(req, res, next) {
    try {
        const roles = await service.getRoles();
        (0, response_1.sendSuccess)(res, roles, {
            statusCode: 200,
            message: "User updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
}
async function createRoleController(req, res, next) {
    try {
        const role = await service.createRole(req.body);
        (0, response_1.sendSuccess)(res, role, {
            statusCode: 201,
            message: "Role created successfully",
        });
    }
    catch (error) {
        next(error);
    }
}
async function updateRoleController(req, res, next) {
    try {
        const role = await service.updateRole(Number(req.params.roleId), req.body);
        (0, response_1.sendSuccess)(res, role, {
            statusCode: 200,
            message: "Role updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
}
async function getPermissionsController(req, res, next) {
    try {
        const permissions = await service.getPermissions();
        (0, response_1.sendSuccess)(res, permissions, {
            statusCode: 200,
            message: "Role updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
}
async function updateRolePermissionsController(req, res, next) {
    try {
        const result = await service.updateRolePermissions(Number(req.params.roleId), req.body.permissionIds);
        (0, response_1.sendSuccess)(res, result, {
            statusCode: 200,
            message: "Role updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
}
