import type {
    PensionerClient,
    PensionLoanInfo,
    LoanAccount,
    LoanCollection,
    LoanLedgerEntry,
    LoanDeduction,
} from "./ssp-domain.types";

export interface PensionerComputationProfile {
    client: PensionerClient;
    pensionInfo: PensionLoanInfo | null;

    loans: LoanAccount[];
}

export interface ExistingLoanContext {
    loan: LoanAccount;

    collections: LoanCollection[];
    ledger: LoanLedgerEntry[];
    deductions: LoanDeduction[];

    paidTerms: number;
    remainingTerms: number;

    currentBalance: number;
}