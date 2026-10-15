
import type {
    ActiveLoan,
    ComputationSlipFormValues,
    Pensioner,
} from "../types/computationSlip.types";

export interface SupplementaryCharge {
    id: string;
    chargeMonth: string;
    principalBasis: number;
    chargeAmount: number;
    paidAmount: number;
}

export interface ComputationManagerInput {
    values: ComputationSlipFormValues;
    pensioner: Pensioner;
    activeLoan: ActiveLoan | null;

    currentOutstandingCharges?: SupplementaryCharge[];
    carriedOutstandingCharges?: SupplementaryCharge[];
}

export interface ComputationChargeBreakdown {
    id: string;
    chargeMonth: string;
    principalBasis: number;
    chargeAmount: number;
    paidAmount: number;
    outstandingAmount: number;
}
