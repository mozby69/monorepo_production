import {
    getLoanInstallmentPeriods,
    getPeriodIndex,
    type LoanCoverage,
} from "./computationEffectivity.manager";

export interface RenewalProjectionInput {
    loan: LoanCoverage;
    currentBalance: number;
    installment: number;
    transactionDate: string;
    newEffectivityDate: string;
    settledPeriodIndexes: Set<number>;
}

export interface RenewalProjectionResult {
    actualBalance: number;
    projectedLRCollections: number;
    projectedSLCollections: number;
    projectedSourceLoanBalance: number;
    projectedLRPeriods: string[];
    projectedSLPeriods: string[];
    projectedPaidTerms: number;
}

export function calculateRenewalProjection(
    input: RenewalProjectionInput
): RenewalProjectionResult {
    const {
        loan,
        currentBalance,
        installment,
        transactionDate,
        newEffectivityDate,
        settledPeriodIndexes,
    } = input;

    const transactionPeriod = getPeriodIndex(
        Number(transactionDate.slice(0, 4)),
        Number(transactionDate.slice(5, 7))
    );

    const newEffectivityPeriod = getPeriodIndex(
        Number(newEffectivityDate.slice(0, 4)),
        Number(newEffectivityDate.slice(5, 7))
    );

    const installmentPeriods =
        getLoanInstallmentPeriods(
            loan,
            settledPeriodIndexes
        );

    const projectedLRPeriods: string[] = [];

    let projectedLRCollections = 0;

    for (const period of installmentPeriods) {
        const index = getPeriodIndex(
            period.year,
            period.month
        );

        if (
            loan.loanStatus !== "ACTIVE" ||
            period.isSettled ||
            index < transactionPeriod ||
            index >= newEffectivityPeriod
        ) {
            continue;
        }

        projectedLRPeriods.push(
            `${period.year}-${String(
                period.month
            ).padStart(2, "0")}`
        );

        projectedLRCollections += installment;
    }

    const projectedSourceLoanBalance = Math.max(
        0,
        currentBalance - projectedLRCollections
    );

    return {
        actualBalance: currentBalance,
        projectedLRCollections,
        projectedSLCollections: 0,
        projectedSourceLoanBalance,
        projectedLRPeriods,
        projectedSLPeriods: [],
        projectedPaidTerms:
            projectedLRPeriods.length,
    };
}