// components/roles/RoleTable.tsx

import type { Role } from "@repo/shared";

type RoleTableProps = {
    roles: Role[];
    onEdit: (role: Role) => void;
};

export function RoleTable({
    roles,
    onEdit,
}: RoleTableProps) {
    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th>Role</th>
                    <th>Description</th>
                    <th>Permissions</th>
                    <th />
                </tr>
            </thead>

            <tbody>
                {roles.map((role) => (
                    <tr key={role.id}>
                        <td>{role.name}</td>
                        <td>{role.description ?? "-"}</td>
                        <td>{role.permissions.length}</td>

                        <td>
                            <button onClick={() => onEdit(role)}>
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}