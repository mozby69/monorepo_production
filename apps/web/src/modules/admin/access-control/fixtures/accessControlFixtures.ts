import type {
    Permission,
    Role,
    User,
} from "@repo/shared";

export const accessControlFixture = {
    users: [
        {
            id: 1,
            name: "Sample User",
            username: "sample.user",
            email: "sample@example.com",
            isActive: true,
            roles: [
                {
                    id: 1,
                    name: "ADMIN",
                },
            ],
        },
        {
            id: 2,
            name: "John Doe",
            username: "john.doe",
            email: "john@example.com",
            isActive: true,
            roles: [
                {
                    id: 2,
                    name: "USER",
                },
            ],
        },
    ] as User[],

    roles: [
        {
            id: 1,
            name: "ADMIN",
            description: "System administrator",
            permissions: [],
        },
        {
            id: 2,
            name: "USER",
            description: "Standard system user",
            permissions: [],
        },
    ] as Role[],

    permissions: [
        {
            id: 1,
            name: "USER_CREATE",
            description: "Create users",
        },
        {
            id: 2,
            name: "USER_UPDATE",
            description: "Update users",
        },
        {
            id: 3,
            name: "ADMIN_MANAGE",
            description: "Manage administration",
        },
    ] as Permission[],
};