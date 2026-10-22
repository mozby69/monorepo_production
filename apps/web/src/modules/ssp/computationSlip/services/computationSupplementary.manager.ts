import type {
    SupplementaryLoanAccount,
    SupplementaryLoanCharge,
} from "../types/ssp-supplementary.types";

export interface SupplementaryContext {
    activeSupplementaryLoan: SupplementaryLoanAccount | null;
    supplementaryBalance: number;
    unpaidCharges: SupplementaryLoanCharge[];
    totalUnpaidCharges: number;
}

export function computationSupplementaryManager(
    clientId: number,
    supplementaryLoans: SupplementaryLoanAccount[],
    charges: SupplementaryLoanCharge[]
): SupplementaryContext {
    const clientLoans = supplementaryLoans.filter(
        (loan) => loan.clientId === clientId
    );

    const activeLoans = clientLoans.filter(
        (loan) => loan.status === "ACTIVE"
    );

    if (activeLoans.length > 1) {
        throw new Error(
            "Multiple active SL records found."
        );
    }

    const activeSupplementaryLoan = activeLoans[0] ?? null;

    const clientSlIds = new Set(
        clientLoans.map((loan) => loan.id)
    );

    const unpaidCharges = charges
        .filter(
            (charge) =>
                clientSlIds.has(charge.slId) &&
                charge.status === "UNPAID"
        )
        .sort(
            (a, b) =>
                a.dueDate.localeCompare(b.dueDate) ||
                a.id - b.id
        );

    return {
        activeSupplementaryLoan,

        supplementaryBalance:
            activeSupplementaryLoan?.balanceAmount ?? 0,

        unpaidCharges,

        totalUnpaidCharges: unpaidCharges.reduce(
            (sum, charge) =>
                sum + charge.interestAmount,
            0
        ),
    };
}