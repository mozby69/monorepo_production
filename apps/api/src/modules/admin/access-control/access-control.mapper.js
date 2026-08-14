"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUser = mapUser;
exports.mapRole = mapRole;
function mapUser(user) {
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        isActive: user.isActive,
        roles: user.roles.map((entry) => ({
            id: entry.role.id,
            name: entry.role.name,
            description: entry.role.description,
            permissions: entry.role.permissions.map((item) => ({
                id: item.permission.id,
                code: item.permission.code,
                name: item.permission.name,
            })),
        })),
    };
}
function mapRole(role) {
    return {
        id: role.id,
        name: role.name,
        description: role.description,
        permissions: role.permissions.map((item) => ({
            id: item.permission.id,
            code: item.permission.code,
            name: item.permission.name,
        })),
    };
}
