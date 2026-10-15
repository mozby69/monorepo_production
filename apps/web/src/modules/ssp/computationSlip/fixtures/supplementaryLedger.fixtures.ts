import type {
    SupplementaryLedgerEntry,
} from "../types/ssp-supplementary.types";

export const supplementaryLedgerFixtures:
    SupplementaryLedgerEntry[] = [
        {
            id: 1,
            clientId: 1,
            slId: 501,

            transactionDate: "2026-02-15",

            journalVoucherNo: null,
            officialReceiptNo: "SL-OR-001",

            monthlyEffectivity: 2,
            totalCollected: 2000,

            appliedTo: "SL-501",

            debit: 0,
            credit: 2000,

            balance: 8000,
            atmBalance: 10000,

            branchId: 1,
        },
    ];