
"use client";

import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { activeLoanFixtures } from "../fixtures/activeLoan.fixtures";
import { supplementaryLoanFixtures } from "../fixtures/supplementaryLoan.fixtures";
import { supplementaryChargesFixtures, } from "../fixtures/supplementaryCharges.fixtures";
import { DEFAULT_COMPUTATION_VALUES } from "../constants/computationSlip.constants";
import { useComputationCalculation } from "./useComputationCalculation";
import { computationSupplementaryManager, } from "../services/computationSupplementary.manager";
import { selectOldestAffordableCharges } from "../services/computationSupplementaryCharges.manager";
import type { Pensioner, ActiveLoan, ComputationSlipFormValues, } from "../types/computationSlip.types";
import type { SupplementaryCharge, } from "../services/computation.manager.types";
import { loanCollectionsFixtures } from "../fixtures/loanCollections.fixtures";
import { previousOutstandingFeesFixtures, } from "../fixtures/previousOutstandingFees.fixtures";
import { pensionLoanInfoFixtures } from "../fixtures/pensionLoanInfo.fixtures";
import { loanAccountsFixtures } from "../fixtures/loanAccounts.fixtures";

export function useComputationSlip() {
    const [
        selectedPensioner,
        setSelectedPensioner,
    ] = useState<Pensioner | null>(null);

    const form = useForm<ComputationSlipFormValues>({
        defaultValues: DEFAULT_COMPUTATION_VALUES,
        mode: "onChange",
    });

    const watchedValues = useWatch({
        control: form.control,
    });

    const selectedAccountNumber = useWatch({
        control: form.control,
        name: "accountNumber",
    });

    const selectedSupplementaryChargeIds = useWatch({
        control: form.control,
        name: "selectedSupplementaryChargeIds",
    }) ?? [];

    // =================================================
    // 1. ACTIVE LOANS
    // =================================================

    const activeLoans = useMemo(() => {
        if (!selectedPensioner) return [];

        return activeLoanFixtures.filter(
            (loan) =>
                loan.pensionerId === selectedPensioner.id &&
                loan.loanStatus === "ACTIVE"
        );
    }, [selectedPensioner]);

    const selectedLoan = useMemo(() => {
        return activeLoans.find(
            (loan) =>
                loan.accountNumber === selectedAccountNumber
        ) ?? null;
    }, [activeLoans, selectedAccountNumber]);

    const selectedPensionLoanInfo = useMemo(() => {
        if (!selectedLoan) return null;

        return pensionLoanInfoFixtures.find(
            (info) =>
                info.id === selectedLoan.pensionLoanInfoId
        ) ?? null;
    }, [selectedLoan]);

    const availableChangeAmount = Number(
        selectedPensionLoanInfo?.availableChangeAmount ?? 0
    );

    // =================================================
    // 2. SUPPLEMENTARY CONTEXT
    // =================================================

    const supplementaryContext = useMemo(() => {
        if (!selectedPensioner) return null;

        return computationSupplementaryManager(
            selectedPensioner.id,
            supplementaryLoanFixtures,
            supplementaryChargesFixtures
        );
    }, [selectedPensioner]);

    // =================================================
    // 3. MAP SUPPLEMENTARY CHARGES
    // =================================================

    const supplementaryCharges = useMemo(() => {
        if (!supplementaryContext) {
            return {
                current: [] as SupplementaryCharge[],
                carried: [] as SupplementaryCharge[],
            };
        }

        const currentSlId =
            supplementaryContext.activeSupplementaryLoan?.id;

        const current: SupplementaryCharge[] = [];
        const carried: SupplementaryCharge[] = [];

        for (
            const charge of supplementaryContext.unpaidCharges
        ) {
            const mapped: SupplementaryCharge = {
                id: String(charge.id),

                chargeMonth: `${charge.yearEffectivity}-${String(
                    charge.monthEffectivity
                ).padStart(2, "0")}`,

                principalBasis: Number(charge.slBalance),

                chargeAmount: Number(charge.interestAmount),

                paidAmount: 0,
            };

            if (
                currentSlId != null &&
                charge.slId === currentSlId
            ) {
                current.push(mapped);
            } else {
                carried.push(mapped);
            }
        }

        return {
            current,
            carried,
        };
    }, [supplementaryContext]);

    // =================================================
    // 4. SELECT PENSIONER / LOAN
    // =================================================

    function selectPensioner(
        pensioner: Pensioner | null
    ) {
        setSelectedPensioner(pensioner);

        form.reset({
            ...DEFAULT_COMPUTATION_VALUES,
            pensionerId: pensioner?.id ?? null,
            selectedSupplementaryChargeIds: [],
            previousFeePayments: [],
        });
    }

    function selectLoan(loan: ActiveLoan) {
        form.setValue(
            "accountNumber",
            loan.accountNumber,
            { shouldDirty: true }
        );

        form.setValue(
            "installment",
            loan.installment,
            { shouldDirty: true }
        );

        form.setValue(
            "supplementaryBalance",
            loan.supplementaryBalance,
            { shouldDirty: true }
        );

        form.setValue(
            "selectedSupplementaryChargeIds",
            [],
            { shouldDirty: true }
        );

        form.setValue("icodAmountToPay", null, {
            shouldDirty: true,
            shouldValidate: true,
        });

        form.setValue("previousFeePayments", [], {
            shouldDirty: true,
            shouldValidate: true,
        });
    }

    // =================================================
    // 5. COMPUTATION INPUT
    // =================================================
    const currentOutstandingCharges =
        supplementaryCharges.current;

    const carriedOutstandingCharges =
        supplementaryCharges.carried;

    // =================================================
    // 5. COMPUTATION INPUT
    // =================================================

    const previousOutstandingFees = useMemo(() => {
        if (!selectedPensioner || !selectedLoan) {
            return [];
        }

        const pensionAccountLoanIds = new Set(
            loanAccountsFixtures
                .filter(
                    (loan) =>
                        loan.clientId === selectedPensioner.id &&
                        loan.pensionLoanInfoId ===
                        selectedLoan.pensionLoanInfoId
                )
                .map((loan) => loan.id)
        );

        return previousOutstandingFeesFixtures.filter(
            (fee) =>
                pensionAccountLoanIds.has(fee.loanId) &&
                fee.outstandingAmount > 0
        );
    }, [selectedPensioner, selectedLoan]);

    const calculationInput = useMemo(() => {
        if (!selectedPensioner) {
            return null;
        }

        const values: ComputationSlipFormValues = {
            ...DEFAULT_COMPUTATION_VALUES,
            ...watchedValues,

            pensionerId: selectedPensioner.id,

            selectedSupplementaryChargeIds:
                watchedValues.selectedSupplementaryChargeIds ?? [],

            previousFeePayments:
                (watchedValues.previousFeePayments ?? []).map((payment) => ({
                    feeItemId: payment.feeItemId ?? "",
                    amountToPay: payment.amountToPay ?? 0,
                })),
        };

        return {
            values,

            pensioner: selectedPensioner,

            activeLoan: selectedLoan,

            currentOutstandingCharges,

            carriedOutstandingCharges,

            previousOutstandingFees,

            // Temporary placeholder until the collection
            // fixtures are connected.
            loanCollections: selectedLoan
                ? loanCollectionsFixtures.filter(
                    (collection) =>
                        collection.loanId === selectedLoan.id
                )
                : [],
        };
    }, [
        watchedValues,
        selectedPensioner,
        selectedLoan,
        currentOutstandingCharges,
        carriedOutstandingCharges,
        previousOutstandingFees
    ]);

    const {
        result,
        error: calculationError,
    } = useComputationCalculation(calculationInput);

    // =================================================
    // 6. SUPPLEMENTARY CHARGE ACTIONS
    // =================================================

    function toggleSupplementaryCharge(chargeId: string) {
        const current =
            form.getValues(
                "selectedSupplementaryChargeIds"
            ) ?? [];

        const next = current.includes(chargeId)
            ? current.filter((id) => id !== chargeId)
            : [...current, chargeId];

        form.setValue(
            "selectedSupplementaryChargeIds",
            next,
            {
                shouldDirty: true,
                shouldValidate: true,
            }
        );

        if (next.length > 0) {
            form.setValue(
                "applySupplementaryCharge",
                true,
                {
                    shouldDirty: true,
                    shouldValidate: true,
                }
            );
        }
    }

    function clearSupplementaryCharges() {
        form.setValue(
            "selectedSupplementaryChargeIds",
            [],
            {
                shouldDirty: true,
                shouldValidate: true,
            }
        );
    }

    function selectAffordableSupplementaryCharges(
        availableCashOut: number
    ) {
        if (!supplementaryContext) return;

        const charges =
            supplementaryContext.unpaidCharges.map(
                (charge) => ({
                    id: String(charge.id),
                    interestAmount:
                        Number(charge.interestAmount),
                    dueDate: String(charge.dueDate),
                })
            );

        const ids = selectOldestAffordableCharges(
            charges,
            availableCashOut
        );

        form.setValue(
            "selectedSupplementaryChargeIds",
            ids,
            {
                shouldDirty: true,
                shouldValidate: true,
            }
        );

        if (ids.length > 0) {
            form.setValue(
                "applySupplementaryCharge",
                true,
                {
                    shouldDirty: true,
                    shouldValidate: true,
                }
            );
        }
    }

    return {
        form,

        selectedPensioner,
        selectedLoan,
        activeLoans,

        selectPensioner,
        selectLoan,

        result,
        calculationError,

        supplementaryContext,
        selectedSupplementaryChargeIds,

        toggleSupplementaryCharge,
        clearSupplementaryCharges,
        selectAffordableSupplementaryCharges,

        previousOutstandingFees,

        selectedPensionLoanInfo,
        availableChangeAmount,

        loanCollections: selectedLoan
            ? loanCollectionsFixtures.filter(
                (collection) =>
                    collection.loanId === selectedLoan.id
            )
            : [],
    };
}
