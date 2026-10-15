"use client";

import { useMemo } from "react";

import {
    computationManager,
} from "../services/computation.manager";

import type {
    ComputationManagerInput,
} from "../services/computation.manager.types";

export function useComputationCalculation(
    input: ComputationManagerInput | null
) {
    return useMemo(() => {
        if (!input) {
            return {
                result: null,
                error: null,
            };
        }

        const { values } = input;

        if (
            !values.transactionDate ||
            values.terms <= 0 &&
            values.transactionType !== "CHANGE_13TH_MONTH"
        ) {
            return {
                result: null,
                error: null,
            };
        }

        try {
            return {
                result: computationManager(input),
                error: null,
            };
        } catch (error) {
            return {
                result: null,
                error:
                    error instanceof Error
                        ? error.message
                        : "Unable to calculate loan.",
            };
        }
    }, [input]);
}