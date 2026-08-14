import { useQuery } from "@tanstack/react-query";

import { getDashboardService } from "../services/dashboard.service";

export function useDashboard() {
    return useQuery({
        queryKey: ["admin", "dashboard"],
        queryFn: getDashboardService,
    });
}