import type {
    ComputationSlipFormValues,
    TransactionType,
} from "../types/computationSlip.types";


export const TRANSACTION_TYPE_OPTIONS: {
    label: string;
    value: TransactionType;
}[] = [
        { label: "New Account", value: "NEW" },
        { label: "Closed Renew", value: "RENEW" },
        { label: "Transfer", value: "TRANSFER" },
        { label: "Change 13th Month", value: "CHANGE" },
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
    icodAmountToPay: null,
    supplementary: 0,
    supplementaryBalance: 0,
    changeAmount: 0,
    applySupplementaryCharge: false,
    selectedSupplementaryChargeIds: [],
    selectedDeductionCodes: [],
    previousFeePayments: [],
};