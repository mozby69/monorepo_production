import type {
    PreviousOutstandingFee,
} from "../types/computationSlip.types";

export const previousOutstandingFeesFixtures:
    PreviousOutstandingFee[] = [
        {
            feeItemId: "fee-1001",
            loanId: 1001,
            transactionType: "NEW",
            deductionCode: "ICOD",
            originalAmount: 5000,
            paidAmount: 2000,
            outstandingAmount: 3000,
        },
        {
            feeItemId: "fee-1002",
            loanId: 1001,
            transactionType: "NEW",
            deductionCode: "COLL_FEE",
            originalAmount: 1000,
            paidAmount: 500,
            outstandingAmount: 500,
        },
    ];