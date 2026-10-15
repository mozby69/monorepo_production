import type {
    LoanCollection,
} from "../types/ssp-domain.types";

export const loanCollectionsFixtures: LoanCollection[] = [
    {
        id: 1,
        clientId: 1,
        loanId: 1001,

        collectionDate: "2026-02-15",
        batchNo: "BATCH-001",

        monthEffectivity: 2,
        yearEffectivity: 2026,

        amount: 5000,
        posted: true,
        collectionStatus: "POSTED",

        bankNo: "1234567890",
        clientName: "Juan Dela Cruz",

        balanceTerms: 23,
        atmBalance: 10000,

        branchId: 1,
        createdAt: "2026-02-15T00:00:00Z",
        updatedAt: "2026-02-15T00:00:00Z",
    },
    {
        id: 2,
        clientId: 1,
        loanId: 1001,

        collectionDate: "2026-03-15",
        batchNo: "BATCH-002",

        monthEffectivity: 3,
        yearEffectivity: 2026,

        amount: 5000,
        posted: true,
        collectionStatus: "POSTED",

        bankNo: "1234567890",
        clientName: "Juan Dela Cruz",

        balanceTerms: 22,
        atmBalance: 10000,

        branchId: 1,
        createdAt: "2026-03-15T00:00:00Z",
        updatedAt: "2026-03-15T00:00:00Z",
    },
];