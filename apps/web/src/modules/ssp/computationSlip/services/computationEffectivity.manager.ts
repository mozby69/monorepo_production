export interface CollectionPeriod {
    month: number;
    year: number;
}

export interface LoanCoverage {
    id: number;
    loanStatus: "ACTIVE" | "CLOSED" | "RENEWED" | "PAST_DUE";
    monthEffectivity: number;
    yearEffectivity: number;
    terms: number;
}

export interface InstallmentPeriod extends CollectionPeriod {
    isSettled: boolean;
}

export type CollectionDestination = "LR" | "SL";

export function getPeriodIndex(
    year: number,
    month: number
): number {
    return year * 12 + month - 1;
}

export function getPeriodFromIndex(
    index: number
): CollectionPeriod {
    return {
        year: Math.floor(index / 12),
        month: (index % 12) + 1,
    };
}

export function getLoanInstallmentPeriods(
    loan: LoanCoverage,
    settledPeriodIndexes: Set<number>
): InstallmentPeriod[] {
    const start = getPeriodIndex(
        loan.yearEffectivity,
        loan.monthEffectivity
    );

    return Array.from(
        { length: loan.terms },
        (_, index) => {
            const periodIndex = start + index;
            const period = getPeriodFromIndex(periodIndex);

            return {
                ...period,
                isSettled:
                    settledPeriodIndexes.has(periodIndex),
            };
        }
    );
}

export function resolveCollectionDestination(
    period: CollectionPeriod,
    loan: LoanCoverage | null,
    settledPeriodIndexes: Set<number>
): CollectionDestination {
    if (!loan || loan.loanStatus !== "ACTIVE") {
        return "SL";
    }

    const periodIndex = getPeriodIndex(
        period.year,
        period.month
    );

    const start = getPeriodIndex(
        loan.yearEffectivity,
        loan.monthEffectivity
    );

    const end = start + loan.terms - 1;

    if (periodIndex < start || periodIndex > end) {
        return "SL";
    }

    if (settledPeriodIndexes.has(periodIndex)) {
        return "SL";
    }

    return "LR";
}