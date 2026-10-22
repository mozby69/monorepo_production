
import {
    getPeriodIndex,
} from "./computationEffectivity.manager";

// =====================================================
// TYPES
// =====================================================

export interface LoanCollection {
    id: number;
    loanId: number;
    collectionDate: string;
    monthEffectivity: number;
    yearEffectivity: number;
    amount: number;
    posted: boolean;
    collectionStatus: string;
}

export interface CollectionAnalysis {
    settledPeriodIndexes: Set<number>;
    actualPaidTerms: number;
    totalCollected: number;
}

interface LoanAccountForCollection {
    id: number;
    monthEffectivity: number;
    yearEffectivity: number;
    terms: number;
}

interface CollectionRecord {
    loanId: number;
    monthEffectivity: number;
    yearEffectivity: number;
    collectionDate: string;
    amount: number;
    posted: boolean;
    collectionStatus: string;
}

interface CollectionManagerResult {
    paidTerms: number;
    nextCollectionDate: string | null;
}

// =====================================================
// HELPERS
// =====================================================

function formatPeriodDate(period: number): string {
    const year = Math.floor(period / 12);
    const month = (period % 12) + 1;

    return `${year}-${String(month).padStart(2, "0")}-01`;
}

// =====================================================
// ANALYZE ACTUAL COLLECTIONS
// =====================================================

export function analyzeLoanCollections(
    loanId: number,
    installment: number,
    collections: LoanCollection[],
    asOfDate: string,
    loan?: Pick<
        LoanAccountForCollection,
        "monthEffectivity" | "yearEffectivity" | "terms"
    >
): CollectionAnalysis {
    if (installment <= 0) {
        throw new Error(
            "Installment must be greater than zero."
        );
    }

    const totals = new Map<number, number>();

    const startPeriod = loan
        ? getPeriodIndex(
            loan.yearEffectivity,
            loan.monthEffectivity
        )
        : null;

    const endPeriod =
        startPeriod !== null && loan
            ? startPeriod + loan.terms
            : null;

    for (const collection of collections) {
        if (
            collection.loanId !== loanId ||
            !collection.posted ||
            collection.collectionStatus !== "POSTED" ||
            collection.collectionDate > asOfDate
        ) {
            continue;
        }

        const period = getPeriodIndex(
            collection.yearEffectivity,
            collection.monthEffectivity
        );

        // Exclude pre-effectivity and out-of-term periods
        // when the loan schedule is provided.
        if (
            startPeriod !== null &&
            endPeriod !== null &&
            (period < startPeriod || period >= endPeriod)
        ) {
            continue;
        }

        totals.set(
            period,
            (totals.get(period) ?? 0) +
            Number(collection.amount)
        );
    }

    const settledPeriodIndexes = new Set<number>();

    for (const [period, amount] of totals) {
        if (amount >= installment) {
            settledPeriodIndexes.add(period);
        }
    }

    return {
        settledPeriodIndexes,
        actualPaidTerms: settledPeriodIndexes.size,
        totalCollected: [...totals.values()].reduce(
            (sum, amount) => sum + amount,
            0
        ),
    };
}

// =====================================================
// COLLECTION MANAGER
// =====================================================

export function computationCollectionManager(
    loan: LoanAccountForCollection,
    collections: CollectionRecord[],
    installment = 0,
    asOfDate = "9999-12-31"
): CollectionManagerResult {
    const startPeriod = getPeriodIndex(
        loan.yearEffectivity,
        loan.monthEffectivity
    );

    const amountsByPeriod = new Map<number, number>();

    for (const collection of collections) {
        if (
            collection.loanId !== loan.id ||
            !collection.posted ||
            collection.collectionStatus !== "POSTED" ||
            collection.collectionDate > asOfDate
        ) {
            continue;
        }

        const period = getPeriodIndex(
            collection.yearEffectivity,
            collection.monthEffectivity
        );

        // Do not count collections outside loan terms.
        if (
            period < startPeriod ||
            period >= startPeriod + loan.terms
        ) {
            continue;
        }

        amountsByPeriod.set(
            period,
            (amountsByPeriod.get(period) ?? 0) +
            Number(collection.amount)
        );
    }

    const settledPeriods = new Set<number>();

    for (const [period, amount] of amountsByPeriod) {
        if (
            installment > 0 &&
            amount >= installment
        ) {
            settledPeriods.add(period);
        }
    }

    let nextCollectionDate: string | null = null;

    for (let index = 0; index < loan.terms; index++) {
        const period = startPeriod + index;

        if (settledPeriods.has(period)) {
            continue;
        }

        nextCollectionDate = formatPeriodDate(period);
        break;
    }

    return {
        paidTerms: settledPeriods.size,
        nextCollectionDate,
    };
}
