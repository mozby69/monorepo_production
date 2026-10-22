
import type {
    LoanLedgerEntry,
} from "../types/ssp-domain.types";

// =====================================================
// LOAN LEDGER FIXTURES
// Source: Loan ledger transactions
// =====================================================

export const loanLedgerFixtures: LoanLedgerEntry[] = [
    // =================================================
    // CLIENT 1 - JUAN DELA CRUZ
    // ORIGINAL RECORDS PRESERVED
    // =================================================
    {
        id: 1,
        clientId: 1,
        loanId: 1001,
        transactionDate: "2026-09-01",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-001",
        referenceNo: "BATCH-001",
        debit: 0,
        credit: 5000,
        balance: 55000,
        atmBalance: 10000,
        remarks: "September collection",
        branchId: 1,
        createdAt: "2026-02-15T00:00:00Z",
        updatedAt: "2026-02-15T00:00:00Z",
    },
    {
        id: 2,
        clientId: 1,
        loanId: 1001,
        transactionDate: "2026-10-01",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-002",
        referenceNo: "BATCH-002",
        debit: 0,
        credit: 5000,
        balance: 50000,
        atmBalance: 10000,
        remarks: "October collection",
        branchId: 1,
        createdAt: "2026-03-15T00:00:00Z",
        updatedAt: "2026-03-15T00:00:00Z",
    },

    // =================================================
    // CLIENT 2 - MARIA SANTOS
    // TWO POSTED COLLECTIONS
    // =================================================
    {
        id: 3,
        clientId: 2,
        loanId: 1002,
        transactionDate: "2026-03-10",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-003",
        referenceNo: "BATCH-003",
        debit: 0,
        credit: 4200,
        balance: 95800,
        atmBalance: 5000,
        remarks: "March collection",
        branchId: 1,
        createdAt: "2026-03-10T00:00:00Z",
        updatedAt: "2026-03-10T00:00:00Z",
    },
    {
        id: 4,
        clientId: 2,
        loanId: 1002,
        transactionDate: "2026-04-10",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-004",
        referenceNo: "BATCH-004",
        debit: 0,
        credit: 4200,
        balance: 91600,
        atmBalance: 5000,
        remarks: "April collection",
        branchId: 1,
        createdAt: "2026-04-10T00:00:00Z",
        updatedAt: "2026-04-10T00:00:00Z",
    },

    // =================================================
    // CLIENT 3 - PEDRO REYES
    // FULL COLLECTION + PARTIAL COLLECTION
    // =================================================
    {
        id: 5,
        clientId: 3,
        loanId: 1003,
        transactionDate: "2026-04-05",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-005",
        referenceNo: "BATCH-006",
        debit: 0,
        credit: 6500,
        balance: 173500,
        atmBalance: 12000,
        remarks: "April full collection",
        branchId: 1,
        createdAt: "2026-04-05T00:00:00Z",
        updatedAt: "2026-04-05T00:00:00Z",
    },
    {
        id: 6,
        clientId: 3,
        loanId: 1003,
        transactionDate: "2026-05-05",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-006",
        referenceNo: "BATCH-007",
        debit: 0,
        credit: 3000,
        balance: 170500,
        atmBalance: 12000,
        remarks: "May partial collection",
        branchId: 1,
        createdAt: "2026-05-05T00:00:00Z",
        updatedAt: "2026-05-05T00:00:00Z",
    },

    // =================================================
    // CLIENT 4 - ANA GARCIA
    // FINAL COLLECTION, CLOSED LOAN
    // =================================================
    {
        id: 7,
        clientId: 4,
        loanId: 1004,
        transactionDate: "2026-01-10",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-007",
        referenceNo: "BATCH-008",
        debit: 0,
        credit: 3500,
        balance: 0,
        atmBalance: 0,
        remarks: "Final collection - loan closed",
        branchId: 2,
        createdAt: "2026-01-10T00:00:00Z",
        updatedAt: "2026-01-10T00:00:00Z",
    },

    // =================================================
    // CLIENT 5 - JOSE MENDOZA
    // TWO POSTED COLLECTIONS
    // =================================================
    {
        id: 8,
        clientId: 5,
        loanId: 1005,
        transactionDate: "2026-06-12",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-008",
        referenceNo: "BATCH-009",
        debit: 0,
        credit: 7200,
        balance: 192800,
        atmBalance: 15000,
        remarks: "June collection",
        branchId: 2,
        createdAt: "2026-06-12T00:00:00Z",
        updatedAt: "2026-06-12T00:00:00Z",
    },
    {
        id: 9,
        clientId: 5,
        loanId: 1005,
        transactionDate: "2026-07-12",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-009",
        referenceNo: "BATCH-010",
        debit: 0,
        credit: 7200,
        balance: 185600,
        atmBalance: 15000,
        remarks: "July collection",
        branchId: 2,
        createdAt: "2026-07-12T00:00:00Z",
        updatedAt: "2026-07-12T00:00:00Z",
    },

    // =================================================
    // CLIENT 6 - ROBERTO VILLANUEVA
    // PRE-EFFECTIVITY COLLECTION + VALID COLLECTION
    // =================================================
    {
        id: 10,
        clientId: 6,
        loanId: 1006,
        transactionDate: "2025-01-20",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-010",
        referenceNo: "BATCH-011",
        debit: 0,
        credit: 5500,
        balance: 129500,
        atmBalance: 0,
        remarks: "Pre-effectivity collection - not a paid term",
        branchId: 1,
        createdAt: "2025-01-20T00:00:00Z",
        updatedAt: "2025-01-20T00:00:00Z",
    },
    {
        id: 11,
        clientId: 6,
        loanId: 1006,
        transactionDate: "2025-02-15",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-011",
        referenceNo: "BATCH-012",
        debit: 0,
        credit: 5500,
        balance: 124000,
        atmBalance: 0,
        remarks: "February valid installment collection",
        branchId: 1,
        createdAt: "2025-02-15T00:00:00Z",
        updatedAt: "2025-02-15T00:00:00Z",
    },

    // =================================================
    // CLIENT 7 - ELENA RAMOS
    // ONE POSTED COLLECTION
    // =================================================
    {
        id: 12,
        clientId: 7,
        loanId: 1007,
        transactionDate: "2026-03-12",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-012",
        referenceNo: "BATCH-013",
        debit: 0,
        credit: 4000,
        balance: 86000,
        atmBalance: 4000,
        remarks: "March collection",
        branchId: 1,
        createdAt: "2026-03-12T00:00:00Z",
        updatedAt: "2026-03-12T00:00:00Z",
    },

    // CLIENT 8 - ANTONIO FLORES
    // NO POSTED COLLECTIONS - NO COLLECTION LEDGER ENTRY

    // =================================================
    // CLIENT 9 - CARMEN BAUTISTA
    // ONE POSTED COLLECTION
    // =================================================
    {
        id: 13,
        clientId: 9,
        loanId: 1009,
        transactionDate: "2026-05-18",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-013",
        referenceNo: "BATCH-014",
        debit: 0,
        credit: 4000,
        balance: 92000,
        atmBalance: 3000,
        remarks: "May collection",
        branchId: 1,
        createdAt: "2026-05-18T00:00:00Z",
        updatedAt: "2026-05-18T00:00:00Z",
    },

    // CLIENT 10 - RICARDO NAVARRO
    // PENDING COLLECTION - NO POSTED LEDGER ENTRY

    // =================================================
    // CLIENT 11 - TERESA AQUINO
    // TWO POSTED COLLECTIONS
    // =================================================
    {
        id: 14,
        clientId: 11,
        loanId: 1011,
        transactionDate: "2026-06-22",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-014",
        referenceNo: "BATCH-016",
        debit: 0,
        credit: 8000,
        balance: 232000,
        atmBalance: 18000,
        remarks: "June collection",
        branchId: 1,
        createdAt: "2026-06-22T00:00:00Z",
        updatedAt: "2026-06-22T00:00:00Z",
    },
    {
        id: 15,
        clientId: 11,
        loanId: 1011,
        transactionDate: "2026-07-22",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-015",
        referenceNo: "BATCH-017",
        debit: 0,
        credit: 8000,
        balance: 224000,
        atmBalance: 18000,
        remarks: "July collection",
        branchId: 1,
        createdAt: "2026-07-22T00:00:00Z",
        updatedAt: "2026-07-22T00:00:00Z",
    },

    // =================================================
    // CLIENT 12 - FERNANDO CASTILLO
    // ONE POSTED COLLECTION
    // =================================================
    {
        id: 16,
        clientId: 12,
        loanId: 1012,
        transactionDate: "2026-06-11",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-016",
        referenceNo: "BATCH-018",
        debit: 0,
        credit: 6000,
        balance: 144000,
        atmBalance: 7000,
        remarks: "June collection",
        branchId: 2,
        createdAt: "2026-06-11T00:00:00Z",
        updatedAt: "2026-06-11T00:00:00Z",
    },

    // =================================================
    // CLIENT 13 - LOURDES MERCADO
    // PARTIAL POSTED COLLECTION
    // =================================================
    {
        id: 17,
        clientId: 13,
        loanId: 1013,
        transactionDate: "2026-07-27",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-017",
        referenceNo: "BATCH-019",
        debit: 0,
        credit: 2000,
        balance: 113000,
        atmBalance: 2000,
        remarks: "July partial collection",
        branchId: 2,
        createdAt: "2026-07-27T00:00:00Z",
        updatedAt: "2026-07-27T00:00:00Z",
    },

    // =================================================
    // CLIENT 14 - EDUARDO CRUZ
    // ONE POSTED COLLECTION
    // =================================================
    {
        id: 18,
        clientId: 14,
        loanId: 1014,
        transactionDate: "2026-07-03",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-018",
        referenceNo: "BATCH-020",
        debit: 0,
        credit: 9500,
        balance: 275500,
        atmBalance: 20000,
        remarks: "July collection",
        branchId: 1,
        createdAt: "2026-07-03T00:00:00Z",
        updatedAt: "2026-07-03T00:00:00Z",
    },

    // =================================================
    // CLIENT 15 - GLORIA FERNANDEZ
    // ONE POSTED COLLECTION
    // =================================================
    {
        id: 19,
        clientId: 15,
        loanId: 1015,
        transactionDate: "2026-08-19",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-019",
        referenceNo: "BATCH-021",
        debit: 0,
        credit: 3700,
        balance: 85300,
        atmBalance: 3000,
        remarks: "August collection",
        branchId: 1,
        createdAt: "2026-08-19T00:00:00Z",
        updatedAt: "2026-08-19T00:00:00Z",
    },

    // =================================================
    // CLIENT 16 - RAMON TORRES
    // CLOSED LOAN, FINAL COLLECTION
    // =================================================
    {
        id: 20,
        clientId: 16,
        loanId: 1016,
        transactionDate: "2026-07-08",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-020",
        referenceNo: "BATCH-022",
        debit: 0,
        credit: 4000,
        balance: 0,
        atmBalance: 0,
        remarks: "Final collection - loan closed",
        branchId: 2,
        createdAt: "2026-07-08T00:00:00Z",
        updatedAt: "2026-07-08T00:00:00Z",
    },

    // =================================================
    // CLIENT 17 - ROSARIO LIM
    // ONE POSTED COLLECTION
    // =================================================
    {
        id: 21,
        clientId: 17,
        loanId: 1017,
        transactionDate: "2026-09-24",
        transactionType: "COLLECTION",
        journalVoucherNo: null,
        officialReceiptNo: "OR-021",
        referenceNo: "BATCH-023",
        debit: 0,
        credit: 5200,
        balance: 119800,
        atmBalance: 5000,
        remarks: "September collection",
        branchId: 1,
        createdAt: "2026-09-24T00:00:00Z",
        updatedAt: "2026-09-24T00:00:00Z",
    },

    // CLIENT 18 - ALFREDO GONZALES
    // NO POSTED COLLECTIONS

    // CLIENT 19 - NORA SALAZAR
    // NO POSTED COLLECTIONS

    // CLIENT 20 - BENJAMIN LOPEZ
    // NOT YET EFFECTIVE, NO COLLECTIONS
];
