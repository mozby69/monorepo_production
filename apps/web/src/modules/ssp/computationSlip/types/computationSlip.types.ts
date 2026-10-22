import { DeductionCode } from "@repo/shared";

export type PensionerStatus =
    | "Active"
    | "Inactive"
    | "Pending";

export type TransactionType =
    | "NEW"
    | "RENEW"
    | "TRANSFER"
    | "CHANGE"
    | "ADVANCE"
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
    pensionLoanInfoId: number;
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
    nextCollectionDate: string | null;

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

    icodAmountToPay: number | null;
    selectedDeductionCodes: DeductionCode[];

    supplementary: number;
    supplementaryBalance: number;

    changeAmount: number;

    applySupplementaryCharge: boolean;
    selectedSupplementaryChargeIds: string[];

    previousFeePayments: PreviousFeePayment[];
}

export interface ComputationResult {
    // Loan information
    principalAmount: number;
    installment?: number;
    terms?: number;

    // UDI
    udi: number;
    udiRebate: number;

    // Fees
    processingFee: number;
    collectionFee: number;
    icod: number;
    loanProtectionFee: number;

    // Existing LR
    activeLoanBalance: number;

    // Supplementary loan
    supplementary: number;
    supplementaryBalance: number;

    // Supplementary charges
    carriedSupplementaryCharge: number;
    currentSupplementaryCharge: number;
    supplementaryChargeToPay: number;

    // Cash-out
    grossCashOut: number;
    netCashOut: number;
    totalCashOut: number;

    // Effectivity
    effectivityDate: string | null;

    // Optional display information
    accountNumber?: string;
    transactionType?: TransactionType;
}

export type PreviousOutstandingFee = {
    feeItemId: string;
    loanId: number;
    transactionType: string;
    deductionCode: string;
    originalAmount: number;
    paidAmount: number;
    outstandingAmount: number;
};

export type PreviousFeePayment = {
    feeItemId: string;
    amountToPay: number;
};