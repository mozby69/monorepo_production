import { prisma } from "@/lib/database/prisma";

export async function getDashboardCounts() {
    const [
        totalUsers,
        activeUsers,
        totalRoles,
        totalPermissions,
    ] = await prisma.$transaction([
        prisma.user.count(),

        prisma.user.count({
            where: {
                isActive: true,
            },
        }),

        prisma.role.count(),

        prisma.permission.count(),
    ]);

    return {
        totalUsers,
        activeUsers,
        totalRoles,
        totalPermissions,
    };
}