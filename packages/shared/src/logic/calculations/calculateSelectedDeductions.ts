import {
    DEDUCTION_CODES,
    type DeductionCode,
} from "../../constants/SSP/deductionCodes.constants";

type CalculateSelectedDeductionsParams = {
    selectedCodes: DeductionCode[];
    icod: number;
    collectionFee: number;
    processingFee: number;
    loanProtectionFee: number;
};

export function calculateSelectedDeductions({
    selectedCodes,
    icod,
    collectionFee,
    processingFee,
    loanProtectionFee,
}: CalculateSelectedDeductionsParams) {
    const selected = new Set(selectedCodes);

    const deductions = {
        icod: selected.has(DEDUCTION_CODES.ICOD)
            ? icod
            : 0,

        collectionFee: selected.has(DEDUCTION_CODES.COLL_FEE)
            ? collectionFee
            : 0,

        processingFee: selected.has(DEDUCTION_CODES.PROC_FEE)
            ? processingFee
            : 0,

        loanProtectionFee: selected.has(DEDUCTION_CODES.LP_FEE)
            ? loanProtectionFee
            : 0,
    };

    return {
        ...deductions,
        totalDeduction: Math.round(
            (
                deductions.icod +
                deductions.collectionFee +
                deductions.processingFee +
                deductions.loanProtectionFee
            ) * 100
        ) / 100,
    };
}