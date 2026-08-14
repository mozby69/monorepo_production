// hooks/useAccessControl.ts

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createRoleService,
    createUserService,
    getPermissionsService,
    getRolesService,
    getUsersService,
    updateRoleService,
    updateRolePermissionsService,
    updateUserService,
} from "../service/access-control.service";
import { ApiResponse, Permission, Role, UpdateRolePermissionsSchema, UpdateUserSchema, User } from "@repo/shared";

export type UserQueryParams = {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: "all" | "active" | "inactive";
    sort?: string;
};
export function useUsers(param: UserQueryParams) {
    return useQuery<ApiResponse<User[]>>({
        queryKey: ["access-control", "users", param],
        queryFn: () => getUsersService(param),
    });
}

export function useRoles() {
    return useQuery<ApiResponse<Role[]>>({
        queryKey: ["access-control", "roles"],
        queryFn: getRolesService,
    });
}

export function usePermissions() {
    return useQuery<ApiResponse<Permission[]>>({
        queryKey: ["access-control", "permissions"],
        queryFn: getPermissionsService,
    });
}

export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUserService,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["access-control", "users"],
            });
        },
    });
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            userId,
            data,
        }: {
            userId: number;
            data: UpdateUserSchema;
        }) => updateUserService(userId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["access-control", "users"],
            });
        },
    });
}

export function useCreateRole() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createRoleService,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["access-control", "roles"],
            });
        },
    });
}

export function useUpdateRole() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            roleId,
            data,
        }: {
            roleId: number;
            data: UpdateUserSchema;
        }) => updateRoleService(roleId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["access-control", "roles"],
            });
        },
    });
}

export function useUpdateRolePermissions() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            roleId,
            data,
        }: {
            roleId: number;
            data: UpdateRolePermissionsSchema;
        }) => updateRolePermissionsService(roleId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["access-control", "roles"],
            });
        },
    });
}