import RoleGuard from "@/components/guards/RoleGuard";
import { AccessControlView } from "@/modules/admin/access-control";

export default function AccessControlPage() {
    return (
        <RoleGuard roles={["ADMIN"]}>
            <AccessControlView />
        </RoleGuard>
    );
}