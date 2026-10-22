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

        const isChange13thMonth =
            values.transactionType === "CHANGE";

        if (
            !values.transactionDate ||
            (!isChange13thMonth && values.terms <= 0)
        ) {
            return {
                result: null,
                error: null,
            };
        }

        try {
            const result = computationManager(input);

            return {
                result,
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