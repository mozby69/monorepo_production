import api from "@/lib/api/api-client";
import { ApiResponse, AuthenticatedUser, LoginSchema, User } from "@repo/shared";

/* =====================
   API CALLS
===================== */

// LOGIN
export const loginService = async (
    params: LoginSchema
): Promise<ApiResponse<AuthenticatedUser>> => {
    const res = await api.post<ApiResponse<AuthenticatedUser>>("/auth/login", params);

    return res.data;
};

export const Authme = async (): Promise<ApiResponse<AuthenticatedUser>> => {
    const res = await api.get<ApiResponse<AuthenticatedUser>>("/auth/me");

    return res.data;
};

export const LogoutService = async (): Promise<ApiResponse<User>> => {
    const res = await api.post<ApiResponse<User>>("/auth/logout");

    return res.data;
};