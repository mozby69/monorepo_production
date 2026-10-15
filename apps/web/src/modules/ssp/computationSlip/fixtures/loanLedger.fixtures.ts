import type {
    LoanLedgerEntry,
} from "../types/ssp-domain.types";

export const loanLedgerFixtures: LoanLedgerEntry[] = [
    {
        id: 1,
        clientId: 1,
        loanId: 1001,

        transactionDate: "2026-02-15",
        transactionType: "COLLECTION",

        journalVoucherNo: null,
        officialReceiptNo: "OR-001",
        referenceNo: "BATCH-001",

        debit: 0,
        credit: 5000,

        balance: 115000,
        atmBalance: 10000,
        remarks: "February collection",

        branchId: 1,
        createdAt: "2026-02-15T00:00:00Z",
        updatedAt: "2026-02-15T00:00:00Z",
    },
    {
        id: 2,
        clientId: 1,
        loanId: 1001,

        transactionDate: "2026-03-15",
        transactionType: "COLLECTION",

        journalVoucherNo: null,
        officialReceiptNo: "OR-002",
        referenceNo: "BATCH-002",

        debit: 0,
        credit: 5000,

        balance: 110000,
        atmBalance: 10000,
        remarks: "March collection",

        branchId: 1,
        createdAt: "2026-03-15T00:00:00Z",
        updatedAt: "2026-03-15T00:00:00Z",
    },
];