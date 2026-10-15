import type {
    ActiveLoan,
} from "../types/computationSlip.types";

import {
    loanAccountsFixtures,
} from "./loanAccounts.fixtures";

import {
    loanCollectionsFixtures,
} from "./loanCollections.fixtures";

import {
    pensionLoanInfoFixtures,
} from "./pensionLoanInfo.fixtures";

import {
    mapLoanToView,
} from "../services/computation.mapper";

import {
    computationCollectionManager,
} from "../services/computationCollection.manager";

import {
    supplementaryLoanFixtures,
} from "./supplementaryLoan.fixtures";

import {
    supplementaryChargesFixtures,
} from "./supplementaryCharges.fixtures";

import {
    computationSupplementaryManager,
} from "../services/computationSupplementary.manager";

export const activeLoanFixtures: ActiveLoan[] =
    loanAccountsFixtures
        .filter(
            (loan) => loan.loanStatus === "ACTIVE"
        )
        .map((loan) => {
            const pensionInfo =
                pensionLoanInfoFixtures.find(
                    (info) =>
                        info.clientId === loan.clientId
                );

            const collectionContext =
                computationCollectionManager(
                    loan,
                    loanCollectionsFixtures
                );

            const supplementaryContext =
                computationSupplementaryManager(
                    loan.clientId,
                    supplementaryLoanFixtures,
                    supplementaryChargesFixtures
                );

            return mapLoanToView(loan, {
                installment:
                    pensionInfo?.monthlyInstallment ?? 0,

                paidTerms:
                    collectionContext.paidTerms,

                supplementaryBalance:
                    supplementaryContext.supplementaryBalance,

                nextCollectionDate:
                    collectionContext.nextCollectionDate ??
                    `${loan.yearEffectivity}-` +
                    `${String(loan.monthEffectivity).padStart(2, "0")}-01`,
            });
        });