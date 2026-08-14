// auth.mapper.ts

type AuthUserWithRoles = {
    id: number;
    name: string;
    username: string;

    roles: Array<{
        role: {
            name: string;

            permissions: Array<{
                permission: {
                    code: string;
                };
            }>;
        };
    }>;
};

export function mapAuthenticatedUser(
    user: AuthUserWithRoles
) {
    const roles = user.roles.map(
        (userRole) => userRole.role.name
    );

    const permissions = [
        ...new Set(
            user.roles.flatMap((userRole) =>
                userRole.role.permissions.map(
                    (rolePermission) =>
                        rolePermission.permission.code
                )
            )
        ),
    ];

    return {
        id: user.id,
        name: user.name,
        username: user.username,
        roles,
        permissions,
    };
}