import api from "@/lib/api/api-client";

import {
    ApiResponse,
    User,
    Role,
    Permission,
    CreateUserSchema,
    UpdateUserSchema,
    CreateRoleSchema,
    UpdateRoleSchema,
    UpdateRolePermissionsSchema,
} from "@repo/shared";

/* =====================
   API CALLS
===================== */

type Params = {
    search?: string;
};

// USERS
export const getUsersService = async (param: Params): Promise<
    ApiResponse<User[]>
> => {
    const res = await api.get<ApiResponse<User[]>>(
        "/admin/access-control/users",
        {
            params: param,
            withCredentials: true,
        }
    );

    // console.log('data', res)

    return res.data;
};

export const createUserService = async (
    params: CreateUserSchema
): Promise<ApiResponse<User>> => {
    const res = await api.post<ApiResponse<User>>(
        "/admin/access-control/users",
        params,
        {
            withCredentials: true,
        }
    );

    return res.data;
};

export const updateUserService = async (
    userId: number,
    params: UpdateUserSchema
): Promise<ApiResponse<User>> => {
    const res = await api.patch<ApiResponse<User>>(
        `/admin/access-control/users/${userId}`,
        params,
        {
            withCredentials: true,
        }
    );

    return res.data;
};

// ROLES
export const getRolesService = async (): Promise<
    ApiResponse<Role[]>
> => {
    const res = await api.get<ApiResponse<Role[]>>(
        "/admin/access-control/roles",
        {
            withCredentials: true,
        }
    );

    return res.data;
};

export const createRoleService = async (
    params: CreateRoleSchema
): Promise<ApiResponse<Role>> => {
    const res = await api.post<ApiResponse<Role>>(
        "/admin/access-control/roles",
        params,
        {
            withCredentials: true,
        }
    );

    return res.data;
};

export const updateRoleService = async (
    roleId: number,
    params: UpdateRoleSchema
): Promise<ApiResponse<Role>> => {
    const res = await api.patch<ApiResponse<Role>>(
        `/admin/access-control/roles/${roleId}`,
        params,
        {
            withCredentials: true,
        }
    );

    return res.data;
};

// PERMISSIONS
export const getPermissionsService = async (): Promise<
    ApiResponse<Permission[]>
> => {
    const res = await api.get<ApiResponse<Permission[]>>(
        "/admin/access-control/permissions",
        {
            withCredentials: true,
        }
    );

    return res.data;
};

export const updateRolePermissionsService = async (
    roleId: number,
    params: UpdateRolePermissionsSchema
): Promise<ApiResponse<Role>> => {
    const res = await api.put<ApiResponse<Role>>(
        `/admin/access-control/roles/${roleId}/permissions`,
        params,
        {
            withCredentials: true,
        }
    );

    return res.data;
};