import type {
    SupplementaryLoanCharge,
} from "../types/ssp-supplementary.types";

export const supplementaryChargesFixtures:
    SupplementaryLoanCharge[] = [
        {
            id: 1,
            slId: 501,

            monthEffectivity: 2,
            yearEffectivity: 2026,

            slBalance: 10000,
            interestAmount: 100,

            status: "PAID",
            dueDate: "2026-02-15",

            branchId: 1,

            createdAt: "2026-02-01T00:00:00Z",
            updatedAt: "2026-02-15T00:00:00Z",
        },
        {
            id: 2,
            slId: 501,

            monthEffectivity: 3,
            yearEffectivity: 2026,

            slBalance: 8000,
            interestAmount: 80,

            status: "UNPAID",
            dueDate: "2026-03-15",

            branchId: 1,

            createdAt: "2026-03-01T00:00:00Z",
            updatedAt: "2026-03-01T00:00:00Z",
        },
    ];