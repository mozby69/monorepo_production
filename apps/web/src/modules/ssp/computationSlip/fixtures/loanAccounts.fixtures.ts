import type {
    LoanAccount,
} from "../types/ssp-domain.types";

export const loanAccountsFixtures: LoanAccount[] = [
    {
        id: 1001,
        clientId: 1,

        accountNo: "ACC-2026-001",
        availmentDate: "2026-01-15",

        monthEffectivity: 2,
        yearEffectivity: 2026,

        terms: 24,

        udiAmount: 12000,
        principalAmount: 120000,
        balanceAmount: 110000,

        paymentPosted: true,
        paymentAmount: 5000,

        collectionFee: 500,
        processingFee: 1000,

        loanType: "NEW",
        loanStatus: "ACTIVE",

        comaker: null,
        checkbookCode: null,
        checkNumber: null,

        atmBalance: 10000,

        branchId: 1,
        createdAt: "2026-01-15T00:00:00Z",
        updatedAt: "2026-03-15T00:00:00Z",
    },
];