import type {
    Permission,
    Role,
} from "@repo/shared";

type PermissionMatrixProps = {
    roles: Role[];
    permissions: Permission[];
    onChange: (
        roleId: number,
        permissionId: number,
        checked: boolean
    ) => void;
};

export function PermissionMatrix({
    roles,
    permissions,
    onChange,
}: PermissionMatrixProps) {
    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th>Permission</th>

                    {roles.map((role) => (
                        <th key={role.id}>
                            {role.name}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {permissions.map((permission) => (
                    <tr key={permission.id}>
                        <td>
                            <div>
                                <p>{permission.name}</p>
                                <span className="text-xs text-gray-500">
                                    {permission.code}
                                </span>
                            </div>
                        </td>

                        {roles.map((role) => {
                            const checked =
                                role.permissions.some(
                                    (item) =>
                                        item.id === permission.id
                                );

                            return (
                                <td key={role.id}>
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={(event) =>
                                            onChange(
                                                role.id,
                                                permission.id,
                                                event.target.checked
                                            )
                                        }
                                    />
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}