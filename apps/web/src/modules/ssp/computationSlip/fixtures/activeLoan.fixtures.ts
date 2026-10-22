
import type { ActiveLoan } from "../types/computationSlip.types";

import { loanAccountsFixtures } from "./loanAccounts.fixtures";

import { loanCollectionsFixtures } from "./loanCollections.fixtures";

import { supplementaryLoanFixtures } from "./supplementaryLoan.fixtures";

import { supplementaryChargesFixtures } from "./supplementaryCharges.fixtures";

import { mapLoanToView } from "../services/computation.mapper";

import { computationCollectionManager } from "../services/computationCollection.manager";

import { computationSupplementaryManager } from "../services/computationSupplementary.manager";

// =====================================================
// HELPERS
// =====================================================

function formatEffectivityDate(
    year: number,
    month: number
): string {
    return `${year}-${String(month).padStart(2, "0")}-01`;
}

// =====================================================
// ACTIVE LOAN FIXTURES
// =====================================================

export const activeLoanFixtures: ActiveLoan[] =
    loanAccountsFixtures
        .filter((loan) => loan.loanStatus === "ACTIVE")
        .map((loan) => {
            // =========================================
            // 1. PENSIONER LOAN INFORMATION
            // =========================================

            const installment = Number(loan.installment);

            // =========================================
            // 2. ACTUAL COLLECTION RECORDS
            // =========================================

            const loanCollections =
                loanCollectionsFixtures.filter(
                    (collection) =>
                        collection.loanId === loan.id
                );

            const collectionContext =
                computationCollectionManager(
                    loan,
                    loanCollections,
                    installment
                );

            // =========================================
            // 3. SUPPLEMENTARY LOAN INFORMATION
            // =========================================

            const supplementaryContext =
                computationSupplementaryManager(
                    loan.clientId,
                    supplementaryLoanFixtures,
                    supplementaryChargesFixtures
                );

            // =========================================
            // 4. MAP TO FRONTEND ACTIVE LOAN
            // =========================================

            return mapLoanToView(loan, {
                installment,

                paidTerms:
                    collectionContext.paidTerms,

                supplementaryBalance:
                    supplementaryContext.supplementaryBalance,

                nextCollectionDate:
                    collectionContext.nextCollectionDate ??
                    formatEffectivityDate(
                        loan.yearEffectivity,
                        loan.monthEffectivity
                    ),
            });
        });
