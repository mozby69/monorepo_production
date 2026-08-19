import api from "@/lib/api/api-client";
import type { ApiResponse } from "@repo/shared";
import type { DashboardData } from "@repo/shared";

export async function getDashboardService(): Promise<
    ApiResponse<DashboardData>
> {
    const res = await api.get<ApiResponse<DashboardData>>(
        "/admin/dashboard"
    );

    return res.data;
}