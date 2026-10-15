import {
    LOAN_STATUS_TYPES,
    TRANSACTION_TYPES,
    MINIMUM_PAID_TERMS_FOR_RENEWAL,
} from "../../constants";

type IsEligibleToTransactParams = {
    transactionType: string;

    hasActiveLoan: boolean;

    loanStatus?: string;
    paidTerms?: number;
    terms?: number;
    remainingBalance?: number;
};

type TransactionEligibilityResult = {
    eligible: boolean;
    reason?: string;
};

export function isEligibleToTransact({
    transactionType,
    hasActiveLoan,
    loanStatus,
    paidTerms = 0,
    terms = 0,
    remainingBalance = 0,
}: IsEligibleToTransactParams): TransactionEligibilityResult {

    if (transactionType === TRANSACTION_TYPES.new) {
        if (hasActiveLoan) {
            return {
                eligible: false,
                reason: "Pensioner cannot create a new loan while an active loan exists.",
            };
        }

        return {
            eligible: true,
        };
    }

    if (transactionType === TRANSACTION_TYPES.renew) {
        if (!hasActiveLoan) {
            return {
                eligible: false,
                reason: "Pensioner has no active loan to renew.",
            };
        }

        if (loanStatus !== LOAN_STATUS_TYPES.active) {
            return {
                eligible: false,
                reason: "Only active loan accounts can be renewed.",
            };
        }

        if (paidTerms < MINIMUM_PAID_TERMS_FOR_RENEWAL) {
            return {
                eligible: false,
                reason: `Loan must have at least ${MINIMUM_PAID_TERMS_FOR_RENEWAL} paid terms before renewal.`,
            };
        }

        if (remainingBalance <= 0) {
            return {
                eligible: false,
                reason: "Fully paid loans cannot be renewed.",
            };
        }

        if (paidTerms >= terms) {
            return {
                eligible: false,
                reason: "Loan has already completed its terms.",
            };
        }

        return {
            eligible: true,
        };
    }

    if (transactionType === TRANSACTION_TYPES.returnee) {
        if (hasActiveLoan) {
            return {
                eligible: false,
                reason: "Returnee transaction is not allowed while an active loan exists.",
            };
        }

        if (terms <= 0) {
            return {
                eligible: false,
                reason: "Invalid loan terms.",
            };
        }

        return {
            eligible: true,
        };
    }

    if (terms <= 0) {
        return {
            eligible: false,
            reason: "Invalid loan terms.",
        };
    }

    return {
        eligible: true,
    };
}