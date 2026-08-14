import * as dashboardRepository from "./dashboard.repository";

import type {
    DashboardData,
} from "@repo/shared";

export async function getDashboard(): Promise<DashboardData> {
    return dashboardRepository.getDashboardCounts();
}