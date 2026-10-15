import {
    TRANSACTION_TYPES,
} from "../../constants/SSP/loan.constants";

type CanCalculateTransactionParams = {
    hasSelectedPensioner: boolean;

    transactionDate?: string;

    transactionType: string;

    installment: number;

    terms: number;

    accountNumber?: string;

    changeAmount?: number;
};

export function canCalculateTransaction({
    hasSelectedPensioner,
    transactionDate,
    transactionType,
    installment,
    terms,
    accountNumber,
    changeAmount = 0,
}: CanCalculateTransactionParams): boolean {
    if (
        !hasSelectedPensioner ||
        !transactionDate
    ) {
        return false;
    }

    switch (transactionType) {
        case TRANSACTION_TYPES.new:
            return (
                installment > 0 &&
                terms > 0
            );

        case TRANSACTION_TYPES.renew:
            return (
                !!accountNumber &&
                installment > 0 &&
                terms > 0
            );

        case TRANSACTION_TYPES.additional:
            return (
                installment > 0 &&
                terms > 0
            );

        case TRANSACTION_TYPES.change:
            return (
                !!accountNumber &&
                changeAmount > 0
            );

        case TRANSACTION_TYPES.returnee:
            return (
                installment > 0 &&
                terms > 0
            );

        default:
            return false;
    }
}