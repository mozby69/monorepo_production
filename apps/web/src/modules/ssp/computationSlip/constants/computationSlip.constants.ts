import type {
    ComputationSlipFormValues,
    TransactionType,
} from "../types/computationSlip.types";

export const TRANSACTION_TYPES: Record<
    string,
    TransactionType
> = {
    NEW: "NEW",
    CLOSED_RENEW: "CLOSED_RENEW",
    TRANSFER: "TRANSFER",
    CHANGE_13TH_MONTH: "CHANGE_13TH_MONTH",
    RETURNEE: "RETURNEE",
    ADDITIONAL: "ADDITIONAL",
};

export const TRANSACTION_TYPE_OPTIONS: {
    label: string;
    value: TransactionType;
}[] = [
        { label: "New Account", value: "NEW" },
        { label: "Closed Renew", value: "CLOSED_RENEW" },
        { label: "Transfer", value: "TRANSFER" },
        { label: "Change 13th Month", value: "CHANGE_13TH_MONTH" },
        { label: "Returnee", value: "RETURNEE" },
        { label: "Additional", value: "ADDITIONAL" },
    ];

export const DEFAULT_COMPUTATION_VALUES:
    ComputationSlipFormValues = {
    pensionerId: null,
    transactionDate: "",
    transactionType: "NEW",
    accountNumber: "",
    installment: 0,
    terms: 0,
    supplementary: 0,
    supplementaryBalance: 0,
    changeAmount: 0,
    applySupplementaryCharge: false,
    supplementaryChargeMonthsToPay: 0,
};