import {
    generateLoanSchedule,
    generateUDIRebateSchedule,
    generateSupplementaryLoanSchedule,
    CUT_OFF_DATE_UDI,
    SL_RATE,
} from "@repo/shared";

export interface ComputationScheduleInput {
    effectivityDate: Date | null;
    transactionDate: string;

    installment: number;
    loanTerms: number;
    principalAmount: number;
    udi: number;

    supplementary: number;
    supplementaryBalance: number;
}

export function computationScheduleManager({
    effectivityDate,
    transactionDate,
    installment,
    loanTerms,
    principalAmount,
    udi,
    supplementary,
    supplementaryBalance,
}: ComputationScheduleInput) {
    // Regular loan schedule
    const loanSchedule =
        effectivityDate &&
            loanTerms > 0 &&
            installment > 0 &&
            principalAmount > 0
            ? generateLoanSchedule({
                effectivityDate,
                installment,
                terms: loanTerms,
                principalAmount,
            })
            : [];

    // UDI rebate schedule
    const udiSchedule =
        transactionDate &&
            udi > 0 &&
            loanTerms > 0
            ? generateUDIRebateSchedule({
                transactionDate: new Date(
                    `${transactionDate}T00:00:00`
                ),
                udi,
                terms: loanTerms,
                cutOffDate: CUT_OFF_DATE_UDI,
            })
            : [];

    // Supplementary loan schedule
    const slSchedule =
        effectivityDate &&
            loanTerms > 0 &&
            installment > 0
            ? generateSupplementaryLoanSchedule({
                effectivityDate,
                installment,
                supplementaryAmount:
                    supplementary + supplementaryBalance,
                supplementaryRate: SL_RATE,
            })
            : [];

    const totalSupplementaryCharge =
        slSchedule.reduce(
            (total, item) =>
                total + item.supplementaryCharge,
            0
        );

    return {
        loanSchedule,
        udiSchedule,
        slSchedule,
        totalSupplementaryCharge,
    };
}

export type ComputationScheduleResult =
    ReturnType<typeof computationScheduleManager>;