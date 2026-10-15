import type {
    PensionLoanInfo,
} from "../types/ssp-domain.types";

export const pensionLoanInfoFixtures: PensionLoanInfo[] = [
    {
        id: 1,
        clientId: 1,
        agentId: 1,

        pensionAmount: 15000,
        monthlyInstallment: 5000,
        changeAmount: 10000,

        withdrawAll: false,
        collectionDay: 15,

        pensionType: "SSS",
        branchId: 1,

        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
    },
];