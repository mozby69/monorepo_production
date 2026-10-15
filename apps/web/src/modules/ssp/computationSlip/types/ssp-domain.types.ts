export type DateString = string;

export type Money = number;

// Client master: pen_client_main
export interface PensionerClient {
    id: number;

    title: string | null;
    lastName: string;
    firstName: string;
    middleName: string | null;
    suffix: string | null;
    nickname: string | null;

    birthDate: DateString;
    birthPlace: string | null;

    addressId: number | null;

    bankName: string | null;
    bankAccountNumber: string | null;

    gender: string | null;
    civilStatus: string | null;
    contactNumber: string | null;

    status: string;
    grouping: string | null;
    atmBranch: string | null;

    plp: boolean;

    branchId: number;
    createdAt: DateString;
    updatedAt: DateString;
}

// Pension information: pen_loan_info
export interface PensionLoanInfo {
    id: number;
    clientId: number;
    agentId: number | null;

    pensionAmount: Money;
    monthlyInstallment: Money;
    changeAmount: Money;

    withdrawAll: boolean;
    collectionDay: number;

    pensionType: string;
    branchId: number;

    createdAt: DateString;
    updatedAt: DateString;
}

// Loan account: ssp_loans
export interface LoanAccount {
    id: number;
    clientId: number;

    accountNo: string;
    availmentDate: DateString;

    monthEffectivity: number;
    yearEffectivity: number;

    terms: number;

    udiAmount: Money;
    principalAmount: Money;
    balanceAmount: Money;

    paymentPosted: boolean;
    paymentAmount: Money;

    collectionFee: Money;
    processingFee: Money;

    loanType: string;
    loanStatus: string;

    comaker: string | null;
    checkbookCode: string | null;
    checkNumber: string | null;

    atmBalance: Money;

    branchId: number;
    createdAt: DateString;
    updatedAt: DateString;
}

// Actual collections: sspclct
export interface LoanCollection {
    id: number;

    clientId: number;
    loanId: number;

    collectionDate: DateString;
    batchNo: string | null;

    monthEffectivity: number;
    yearEffectivity: number;

    amount: Money;
    posted: boolean;
    collectionStatus: string;

    bankNo: string | null;
    clientName: string | null;

    balanceTerms: number | null;
    atmBalance: Money;

    branchId: number;
    createdAt: DateString;
    updatedAt: DateString;
}

// Loan ledger: ssp_loan_ledger
export interface LoanLedgerEntry {
    id: number;

    clientId: number;
    loanId: number;

    transactionDate: DateString;
    transactionType: string;

    journalVoucherNo: string | null;
    officialReceiptNo: string | null;
    referenceNo: string | null;

    debit: Money;
    credit: Money;
    balance: Money;

    atmBalance: Money;
    remarks: string | null;

    branchId: number;
    createdAt: DateString;
    updatedAt: DateString;
}

// Applied deductions: ssp_loan_deductions
export interface LoanDeduction {
    id: number;

    loanId: number;
    deductionId: number;

    deductionCode: string;
    deductionFactor: number;
    deductionAmount: Money;

    branchId: number;
    createdAt: DateString;
}