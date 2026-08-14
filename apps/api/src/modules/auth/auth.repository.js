"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByIdWithRoles = findByIdWithRoles;
exports.findByUsernameWithRoles = findByUsernameWithRoles;
exports.findExistingUser = findExistingUser;
exports.findRolesByIds = findRolesByIds;
exports.createUserWithRoles = createUserWithRoles;
exports.findById = findById;
exports.findDuplicateUser = findDuplicateUser;
exports.updateUserWithRoles = updateUserWithRoles;
exports.findAllRoles = findAllRoles;
exports.findAllPermissions = findAllPermissions;
exports.findAllUsers = findAllUsers;
exports.updatePermissions = updatePermissions;
const prisma_1 = require("@/lib/database/prisma");
const authUserSelect = {
    id: true,
    name: true,
    username: true,
    password: true,
    isActive: true,
    roles: {
        select: {
            role: {
                select: {
                    name: true,
                    permissions: {
                        select: {
                            permission: {
                                select: {
                                    code: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
async function findByIdWithRoles(userId) {
    return prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: authUserSelect,
    });
}
async function findByUsernameWithRoles(username) {
    return prisma_1.prisma.user.findUnique({
        where: {
            username,
        },
        select: authUserSelect,
    });
}
async function findExistingUser({ username, email, }) {
    return prisma_1.prisma.user.findFirst({
        where: {
            OR: [
                { username },
                ...(email ? [{ email }] : []),
            ],
        },
    });
}
async function findRolesByIds(roleIds) {
    return prisma_1.prisma.role.findMany({
        where: {
            id: {
                in: roleIds,
            },
        },
    });
}
async function createUserWithRoles(data) {
    const { email, name, username, password, } = data;
    return prisma_1.prisma.$transaction(async (tx) => {
        const createdUser = await tx.user.create({
            data: {
                email,
                name,
                username,
                password,
                isActive: true,
            },
        });
        return createdUser;
    });
}
async function findById(userId) {
    return prisma_1.prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
}
async function findDuplicateUser({ userId, username, email, }) {
    if (!username && !email) {
        return null;
    }
    return prisma_1.prisma.user.findFirst({
        where: {
            id: {
                not: userId,
            },
            OR: [
                ...(username ? [{ username }] : []),
                ...(email ? [{ email }] : []),
            ],
        },
    });
}
async function updateUserWithRoles(userId, data) {
    return prisma_1.prisma.$transaction(async (tx) => {
        const user = await tx.user.update({
            where: {
                id: userId,
            },
            data: {
                ...(data.email !== undefined && {
                    email: data.email,
                }),
                ...(data.name !== undefined && {
                    name: data.name,
                }),
                ...(data.username !== undefined && {
                    username: data.username,
                }),
                ...(data.password !== undefined && {
                    password: data.password,
                }),
                ...(data.isActive !== undefined && {
                    company_id: data.isActive,
                }),
            },
        });
        if (data.roleIds !== undefined) {
            await tx.userRole.deleteMany({
                where: {
                    userId,
                },
            });
            if (data.roleIds.length > 0) {
                await tx.userRole.createMany({
                    data: data.roleIds.map((roleId) => ({
                        userId,
                        roleId,
                    })),
                });
            }
        }
        return user;
    });
}
async function findAllRoles() {
    return prisma_1.prisma.role.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            permissions: {
                select: {
                    roleId: true,
                    permissionId: true,
                    permission: {
                        select: {
                            code: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            name: "asc",
        },
    });
}
// permission.repository.ts
async function findAllPermissions() {
    return prisma_1.prisma.permission.findMany({
        select: {
            id: true,
            code: true,
            name: true,
        },
        orderBy: {
            name: "asc",
        },
    });
}
async function findAllUsers() {
    return prisma_1.prisma.user.findMany({
        select: {
            id: true,
            username: true,
            name: true,
            email: true,
            isActive: true,
            createdAt: true,
            roles: {
                select: {
                    role: {
                        select: {
                            id: true,
                            name: true,
                            permissions: {
                                select: {
                                    permission: {
                                        select: {
                                            id: true,
                                            code: true,
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        orderBy: {
            username: "asc",
        },
    });
}
async function updatePermissions(roleId, permissionIds) {
    return prisma_1.prisma.$transaction(async (tx) => {
        await tx.rolePermission.deleteMany({
            where: {
                roleId,
            },
        });
        if (permissionIds.length > 0) {
            await tx.rolePermission.createMany({
                data: permissionIds.map((permissionId) => ({
                    roleId,
                    permissionId,
                })),
            });
        }
    });
}
