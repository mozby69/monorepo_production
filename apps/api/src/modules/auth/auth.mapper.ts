type AuthUserWithRoles = {
    id: number;
    name: string;
    username: string;

    roles: Array<{
        role: {
            id: number;
            name: string;
            description: string | null;

            permissions: Array<{
                permission: {
                    id: number;
                    code: string;
                    name: string;
                    description: string;
                };
            }>;
        };
    }>;
};

export function mapAuthenticatedUser(
    user: AuthUserWithRoles
) {
    const permissionsMap = new Map<number, {
        id: number;
        code: string;
        name: string;
        description: string;
    }>();

    for (const userRole of user.roles) {
        for (const rolePermission of userRole.role.permissions) {
            const permission = rolePermission.permission;

            permissionsMap.set(permission.id, permission);
        }
    }

    const roles = user.roles.map((userRole) => ({
        id: userRole.role.id,
        name: userRole.role.name,
        description: userRole.role.description,
        permissions: userRole.role.permissions.map(
            (rolePermission) => rolePermission.permission
        ),
    }));

    return {
        id: user.id,
        name: user.name,
        username: user.username,
        roles,
        permissions: Array.from(permissionsMap.values()),
    };
}