type DashboardData = {
    totalUsers: number;
    activeUsers: number;
    totalRoles: number;
    totalPermissions: number;
};

type DashboardContentProps = {
    data: DashboardData;
};

export function DashboardContent({
    data,
}: DashboardContentProps) {
    const cards = [
        {
            label: "Total Users",
            value: data.totalUsers,
        },
        {
            label: "Active Users",
            value: data.activeUsers,
        },
        {
            label: "Roles",
            value: data.totalRoles,
        },
        {
            label: "Permissions",
            value: data.totalPermissions,
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Overview of system activity and access control.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                        <p className="text-sm text-gray-500">
                            {card.label}
                        </p>

                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {card.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="font-semibold text-gray-900">
                        Recent Activity
                    </h2>

                    <div className="mt-4 space-y-3">
                        {[
                            "User account created",
                            "Role permissions updated",
                            "Administrator logged in",
                        ].map((item) => (
                            <div
                                key={item}
                                className="rounded-md bg-gray-50 px-4 py-3 text-sm text-gray-700"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="font-semibold text-gray-900">
                        System Status
                    </h2>

                    <div className="mt-4 space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                                API
                            </span>

                            <span className="text-sm font-medium">
                                Operational
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                                Database
                            </span>

                            <span className="text-sm font-medium">
                                Connected
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}