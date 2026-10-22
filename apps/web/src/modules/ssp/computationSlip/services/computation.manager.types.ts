
import type {
    ActiveLoan,
    ComputationSlipFormValues,
    Pensioner,
    PreviousOutstandingFee,
} from "../types/computationSlip.types";
import { LoanCollection } from "../types/ssp-domain.types";

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

    loanCollections?: LoanCollection[];

    previousOutstandingFees: PreviousOutstandingFee[];

    availableChangeAmount?: number;
}

export interface ComputationChargeBreakdown {
    id: string;
    chargeMonth: string;
    principalBasis: number;
    chargeAmount: number;
    paidAmount: number;
    outstandingAmount: number;
}
