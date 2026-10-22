export const DEDUCTION_CODES = {
    ICOD: "ICOD",
    COLL_FEE: "COLL_FEE",
    PROC_FEE: "PROC_FEE",
    LP_FEE: "LP_FEE",
} as const;

export type DeductionCode =
    (typeof DEDUCTION_CODES)[keyof typeof DEDUCTION_CODES];

export const DEDUCTION_OPTIONS = [
    { value: DEDUCTION_CODES.ICOD, label: "ICOD" },
    { value: DEDUCTION_CODES.COLL_FEE, label: "Collection Fee" },
    { value: DEDUCTION_CODES.PROC_FEE, label: "Processing Fee" },
    { value: DEDUCTION_CODES.LP_FEE, label: "Loan Protection Fee" },
];