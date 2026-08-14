import RoleGuard from "@/components/guards/RoleGuard";
import { DashboardView } from "@/modules/admin/dashboard";

export default function AccessControlPage() {
    return (
        <RoleGuard roles={["ADMIN"]}>
            <DashboardView />
        </RoleGuard>
    );
}