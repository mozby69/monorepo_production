"use client";
import { useEffect, useState } from "react";

import { Skeleton } from "boneyard-js/react";
import "@/bones/registry";

import { DashboardContent } from "../components/DashboardContent";
import { useDashboard } from "../hooks/useDashboard";

const dashboardFixtureData = {
    totalUsers: 0,
    activeUsers: 0,
    totalRoles: 0,
    totalPermissions: 0,
};

export default function DashboardView() {
    const { data, isLoading: dashboardLoading } = useDashboard();
    const dashboardData = data?.data;

    // Development only: keep skeleton visible longer
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        if (dashboardLoading) {
            setShowSkeleton(true);
            return;
        }

        const timer = setTimeout(() => {
            setShowSkeleton(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [dashboardLoading]);

    return (
        <Skeleton
            name="admin-dashboard"
            loading={showSkeleton} // Development only
            // loading={dashboardLoading} // Actual Production use
            fixture={
                <DashboardContent
                    data={dashboardFixtureData}
                />
            }
            fallback={
                <div className="p-6">
                    Loading dashboard...
                </div>
            }
            transition
        >
            {dashboardData && (
                <DashboardContent
                    data={dashboardData}
                />
            )}
        </Skeleton>
    );
}