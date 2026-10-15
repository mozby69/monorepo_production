import type {
    SupplementaryLoanAccount,
} from "../types/ssp-supplementary.types";

export const supplementaryLoanFixtures:
    SupplementaryLoanAccount[] = [
        {
            id: 501,
            clientId: 1,
            branchId: 1,

            availmentDate: "2026-01-15",

            monthEffectivity: 2,
            yearEffectivity: 2026,

            beginningBalance: 10000,
            balanceAmount: 8000,

            terms: 12,

            createdAt: "2026-01-15T00:00:00Z",
            updatedAt: "2026-03-15T00:00:00Z",
        },
    ];