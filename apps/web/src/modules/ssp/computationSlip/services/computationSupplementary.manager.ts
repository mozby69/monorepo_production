import type {
    SupplementaryLoanAccount,
    SupplementaryLoanCharge,
} from "../types/ssp-supplementary.types";

export interface SupplementaryContext {
    activeSupplementaryLoan:
    SupplementaryLoanAccount | null;

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

    if (clientLoans.length > 1) {
        throw new Error(
            "Multiple supplementary accounts found. " +
            "An account-selection rule is required."
        );
    }

    const activeSupplementaryLoan =
        clientLoans[0] ?? null;

    if (!activeSupplementaryLoan) {
        return {
            activeSupplementaryLoan: null,
            supplementaryBalance: 0,
            unpaidCharges: [],
            totalUnpaidCharges: 0,
        };
    }

    const unpaidCharges = charges.filter(
        (charge) =>
            charge.slId === activeSupplementaryLoan.id &&
            charge.status === "UNPAID"
    );

    const totalUnpaidCharges = unpaidCharges.reduce(
        (total, charge) =>
            total + charge.interestAmount,
        0
    );

    return {
        activeSupplementaryLoan,

        supplementaryBalance:
            activeSupplementaryLoan.balanceAmount,

        unpaidCharges,
        totalUnpaidCharges,
    };
}