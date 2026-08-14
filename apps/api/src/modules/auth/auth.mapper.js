"use strict";
// auth.mapper.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAuthenticatedUser = mapAuthenticatedUser;
function mapAuthenticatedUser(user) {
    const roles = user.roles.map((userRole) => userRole.role.name);
    const permissions = [
        ...new Set(user.roles.flatMap((userRole) => userRole.role.permissions.map((rolePermission) => rolePermission.permission.code))),
    ];
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        roles,
        permissions,
    };
}
