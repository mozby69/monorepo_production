export type PensionerStatus =
    | "Active"
    | "Inactive"
    | "Pending";

export type TransactionType =
    | "NEW"
    | "CLOSED_RENEW"
    | "TRANSFER"
    | "CHANGE_13TH_MONTH"
    | "RETURNEE"
    | "ADDITIONAL";

export type LoanStatus =
    | "ACTIVE"
    | "CLOSED"
    | "PAST_DUE";

export interface Pensioner {
    id: number;
    pensionerCode: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    birthDate: string;
    bankName: string;
    actualPension: number;
    status: PensionerStatus;
}

export interface ActiveLoan {
    id: number;
    pensionerId: number;
    accountNumber: string;

    transactionType: TransactionType;
    loanStatus: LoanStatus;

    installment: number;
    terms: number;
    paidTerms: number;

    principalAmount: number;
    remainingBalance: number;
    supplementaryBalance: number;

    transactionDate: string;
    effectivityDate: string;
    nextCollectionDate: string;

    udi: number;
}

export interface ComputationSlip {
    id: number;
    pensionerId: number;
    accountNumber: string;
    transactionDate: string;
    transactionType: TransactionType;
    effectivityDate: string;
    installment: number;
    terms: number;
    principalAmount: number;
    supplementaryAmount: number;
    status: LoanStatus;
}

export interface ComputationSlipFormValues {
    pensionerId: number | null;
    transactionDate: string;
    transactionType: TransactionType;
    accountNumber: string;

    installment: number;
    terms: number;

    supplementary: number;
    supplementaryBalance: number;

    changeAmount: number;

    applySupplementaryCharge: boolean;
    supplementaryChargeMonthsToPay: number;
}

export interface ComputationResult {
    principalAmount: number;
    udi: number;
    udiRebate: number;

    grossCashOut: number;

    processingFee: number;
    collectionFee: number;
    icod: number;
    loanProtectionFee: number;

    netCashOut: number;

    supplementary: number;
    supplementaryBalance: number;

    activeLoanBalance: number;

    carriedSupplementaryCharge: number;
    currentSupplementaryCharge: number;
    supplementaryChargeToPay: number;

    totalCashOut: number;

    effectivityDate: string | null;
}