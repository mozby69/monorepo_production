import type { PaginationMeta, User } from "@repo/shared";

import {
    Table,
    type TableColumn,
    type TablePaginationProps,
} from "@/components/common/Table";

import PermissionGuard from "@/components/guards/PermissionGuard";
import { Button } from "@/components/ui/button";

type UserTableProps = {
    users: User[];
    isLoading?: boolean;

    search: string;
    onSearchChange: (value: string) => void;

    limit: number;
    onLimitChange: (value: number) => void;

    onCreate: () => void;
    onEdit: (user: User) => void;

    pagination?: PaginationMeta;
    onPageChange: (page: number) => void;
};

export function UserTable({
    users,
    isLoading = false,

    search,
    onSearchChange,

    limit,
    onLimitChange,

    onCreate,
    onEdit,

    pagination,
    onPageChange,
}: UserTableProps) {
    const columns: TableColumn<User>[] = [
        {
            key: "name",
            header: "Name",
            render: (user) => user.name,
        },
        {
            key: "username",
            header: "Username",
            render: (user) => user.username,
        },
        {
            key: "email",
            header: "Email",
            render: (user) => user.email ?? "-",
        },
        {
            key: "roles",
            header: "Roles",
            render: (user) => user.roles.join(", "),
        },
        {
            key: "status",
            header: "Status",
            render: (user) =>
                user.isActive
                    ? "Active"
                    : "Inactive",
        },
    ];

    return (
        <Table<User>
            title="Users"
            description="Manage system users and assigned roles."

            columns={columns}
            data={users}

            isLoading={isLoading}

            search={search}
            onSearchChange={onSearchChange}
            searchPlaceholder="Search users..."

            limit={limit}
            onLimitChange={onLimitChange}
            limitOptions={[10, 25, 50, 100]}

            actions={
                <PermissionGuard
                    permissions={["ADMIN_MANAGE"]}
                >
                    <Button
                        type="button"
                        onClick={onCreate}
                    >
                        Create User
                    </Button>
                </PermissionGuard>
            }

            onEdit={onEdit}

            pagination={pagination}
            onPageChange={onPageChange}

            emptyMessage="No users found."

            rowKey={(user) => user.id}
        />
    );
}