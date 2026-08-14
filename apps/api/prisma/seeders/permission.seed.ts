import { prisma } from "../../src/lib/database/prisma";

export async function seedPermissions() {
    const permissions = [
        {
            code: "USER_MANAGE",
            name: "Manage Users",
        },
        {
            code: "ADMIN_MANAGE",
            name: "Manage Admin",
        },
    ];

    for (const permission of permissions) {
        await prisma.permission.upsert({
            where: {
                code: permission.code,
            },
            update: {
                name: permission.name,
            },
            create: permission,
        });
    }

    console.log("✅ Permissions seeded");
}