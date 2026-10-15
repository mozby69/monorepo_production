export type Money = number;
export type DateString = string;

export interface SupplementaryLoanAccount {
    id: number;
    clientId: number;
    branchId: number;

    availmentDate: DateString;

    monthEffectivity: number;
    yearEffectivity: number;

    beginningBalance: Money;

    // Proposed addition to pen_sl_main
    balanceAmount: Money;

    terms: number;

    createdAt: DateString;
    updatedAt: DateString;
}

export type SupplementaryChargeStatus =
    | "PAID"
    | "UNPAID";

export interface SupplementaryLoanCharge {
    id: number;
    slId: number;

    monthEffectivity: number;
    yearEffectivity: number;

    slBalance: Money;
    interestAmount: Money;

    status: SupplementaryChargeStatus;

    // Approved addition
    dueDate: DateString;

    branchId: number;

    createdAt: DateString;
    updatedAt: DateString;
}

export interface SupplementaryLedgerEntry {
    id: number;

    clientId: number;
    slId: number;

    transactionDate: DateString;

    journalVoucherNo: string | null;
    officialReceiptNo: string | null;

    monthlyEffectivity: Money;
    totalCollected: Money;

    appliedTo: string | null;

    debit: Money;
    credit: Money;

    // Historical balance snapshot, not authoritative
    balance: Money;

    atmBalance: Money;

    branchId: number;
}

export interface ThirteenthMonthTransaction {
    id: number;
    clientId: number;

    // Optional relationship, pending confirmation
    loanId: number | null;

    availmentDate: DateString;

    udiAmount: Money;
    principalAmount: Money;
    cashout: Money;

    branchId: number;

    createdAt: DateString;
    updatedAt: DateString;
}