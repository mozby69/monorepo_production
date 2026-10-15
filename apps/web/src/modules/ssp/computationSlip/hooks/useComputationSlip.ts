"use client";

import { useMemo, useState } from "react";
import {
    useForm,
    useWatch,
} from "react-hook-form";

import {
    activeLoanFixtures,
} from "../fixtures/activeLoanFixtures";

import {
    supplementaryChargeFixtures,
} from "../fixtures/supplementaryFixtures";

import {
    DEFAULT_COMPUTATION_VALUES,
} from "../constants/computationSlip.constants";

import {
    useComputationCalculation,
} from "./useComputationCalculation";

import type {
    Pensioner,
    ActiveLoan,
    ComputationSlipFormValues,
} from "../types/computationSlip.types";

export function useComputationSlip() {
    const [
        selectedPensioner,
        setSelectedPensioner,
    ] = useState<Pensioner | null>(null);

    const form = useForm<ComputationSlipFormValues>({
        defaultValues: DEFAULT_COMPUTATION_VALUES,
        mode: "onChange",
    });

    // Watch form values
    const watchedValues = useWatch({
        control: form.control,
    });

    const selectedAccountNumber = useWatch({
        control: form.control,
        name: "accountNumber",
    });

    // Active loans for selected pensioner
    const activeLoans = useMemo(() => {
        if (!selectedPensioner) {
            return [];
        }

        return activeLoanFixtures.filter(
            (loan) =>
                loan.pensionerId === selectedPensioner.id &&
                loan.loanStatus === "ACTIVE"
        );
    }, [selectedPensioner]);

    // Selected active loan
    const selectedLoan = useMemo(() => {
        return (
            activeLoans.find(
                (loan) =>
                    loan.accountNumber === selectedAccountNumber
            ) ?? null
        );
    }, [
        activeLoans,
        selectedAccountNumber,
    ]);

    // Select pensioner
    function selectPensioner(
        pensioner: Pensioner | null
    ) {
        setSelectedPensioner(pensioner);

        form.reset({
            ...DEFAULT_COMPUTATION_VALUES,
            pensionerId: pensioner?.id ?? null,
        });
    }

    // Select active loan
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
    }

    // Prepare calculation input
    const calculationInput = useMemo(() => {
        if (!selectedPensioner) {
            return null;
        }

        const values: ComputationSlipFormValues = {
            ...DEFAULT_COMPUTATION_VALUES,
            ...watchedValues,
            pensionerId: selectedPensioner.id,
        };

        const charges = selectedLoan
            ? supplementaryChargeFixtures[
            selectedLoan.accountNumber
            ]
            : undefined;

        return {
            values,
            pensioner: selectedPensioner,
            activeLoan: selectedLoan,

            currentOutstandingCharges:
                charges?.current ?? [],

            carriedOutstandingCharges:
                charges?.carried ?? [],
        };
    }, [
        watchedValues,
        selectedPensioner,
        selectedLoan,
    ]);

    // Calculate using centralized manager
    const {
        result,
        error: calculationError,
    } = useComputationCalculation(calculationInput);

    return {
        form,

        selectedPensioner,
        selectedLoan,
        activeLoans,

        selectPensioner,
        selectLoan,

        result,
        calculationError,
    };
}