import type {
    SupplementaryCharge,
} from "../services/computation.manager.types";

export const supplementaryChargeFixtures: Record<
    string,
    {
        current: SupplementaryCharge[];
        carried: SupplementaryCharge[];
    }
> = {
    "ACC-2026-001": {
        current: [
            {
                id: "CHG-001",
                chargeMonth: "2026-08-01",
                principalBasis: 15000,
                chargeAmount: 150,
                paidAmount: 0,
            },
            {
                id: "CHG-002",
                chargeMonth: "2026-09-01",
                principalBasis: 15000,
                chargeAmount: 150,
                paidAmount: 50,
            },
        ],
        carried: [
            {
                id: "CHG-003",
                chargeMonth: "2026-07-01",
                principalBasis: 15000,
                chargeAmount: 150,
                paidAmount: 0,
            },
        ],
    },
};