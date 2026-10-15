import RoleGuard from "@/components/guards/RoleGuard";
import { CompSlipView } from "@/modules/ssp/computationSlip/";


export default function AccessControlPage() {
    return (
        <RoleGuard roles={["BRANCH", "ADMIN"]}>
            <CompSlipView />
        </RoleGuard>
    );
}