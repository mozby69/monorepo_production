export function mapUser(user: any) {
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        isActive: user.isActive,

        roles: user.roles.map((entry: any) => ({
            id: entry.role.id,
            name: entry.role.name,
            description: entry.role.description,

            permissions: entry.role.permissions.map(
                (item: any) => ({
                    id: item.permission.id,
                    code: item.permission.code,
                    name: item.permission.name,
                })
            ),
        })),
    };
}

export function mapRole(role: any) {
    return {
        id: role.id,
        name: role.name,
        description: role.description,

        permissions: role.permissions.map(
            (item: any) => ({
                id: item.permission.id,
                code: item.permission.code,
                name: item.permission.name,
            })
        ),
    };
}