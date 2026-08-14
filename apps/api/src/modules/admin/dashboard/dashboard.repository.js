"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardCounts = getDashboardCounts;
const prisma_1 = require("@/lib/database/prisma");
async function getDashboardCounts() {
    const [totalUsers, activeUsers, totalRoles, totalPermissions,] = await prisma_1.prisma.$transaction([
        prisma_1.prisma.user.count(),
        prisma_1.prisma.user.count({
            where: {
                isActive: true,
            },
        }),
        prisma_1.prisma.role.count(),
        prisma_1.prisma.permission.count(),
    ]);
    return {
        totalUsers,
        activeUsers,
        totalRoles,
        totalPermissions,
    };
}
