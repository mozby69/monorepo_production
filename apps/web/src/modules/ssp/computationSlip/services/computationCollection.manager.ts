import type {
    LoanAccount,
    LoanCollection,
} from "../types/ssp-domain.types";

export interface LoanCollectionContext {
    paidTerms: number;
    remainingTerms: number;
    nextCollectionDate: string | null;
    postedCollections: LoanCollection[];
}

function getPeriodIndex(
    year: number,
    month: number
): number {
    return year * 12 + month - 1;
}

function periodToDate(
    period: number
): string {
    const year = Math.floor(period / 12);
    const month = (period % 12) + 1;

    return (
        `${year}-` +
        `${String(month).padStart(2, "0")}-01`
    );
}

export function computationCollectionManager(
    loan: LoanAccount,
    collections: LoanCollection[]
): LoanCollectionContext {
    const loanCollections = collections.filter(
        (collection) =>
            collection.loanId === loan.id &&
            collection.posted &&
            collection.collectionStatus === "POSTED"
    );

    const startPeriod = getPeriodIndex(
        loan.yearEffectivity,
        loan.monthEffectivity
    );

    const paidPeriods = new Set<number>();

    for (const collection of loanCollections) {
        const period = getPeriodIndex(
            collection.yearEffectivity,
            collection.monthEffectivity
        );

        if (
            period >= startPeriod &&
            period < startPeriod + loan.terms
        ) {
            paidPeriods.add(period);
        }
    }

    let paidTerms = 0;

    while (
        paidTerms < loan.terms &&
        paidPeriods.has(startPeriod + paidTerms)
    ) {
        paidTerms++;
    }

    const remainingTerms = Math.max(
        0,
        loan.terms - paidTerms
    );

    const nextCollectionDate =
        paidTerms < loan.terms
            ? periodToDate(startPeriod + paidTerms)
            : null;

    return {
        paidTerms,
        remainingTerms,
        nextCollectionDate,
        postedCollections: loanCollections,
    };
}