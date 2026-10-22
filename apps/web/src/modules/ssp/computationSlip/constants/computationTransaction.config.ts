
import type {
    TransactionType,
} from "../types/computationSlip.types";

export interface TransactionFieldConfig {
    requiresExistingLoan: boolean;
    showInstallment: boolean;
    showTerms: boolean;
    showSupplementary: boolean;
    showChangeAmount: boolean;
    showSupplementaryChargeOption: boolean;
    installmentReadOnly: boolean;
}

export const TRANSACTION_FIELD_CONFIG: Record<
    TransactionType,
    TransactionFieldConfig
> = {
    NEW: {
        requiresExistingLoan: false,
        showInstallment: true,
        showTerms: true,
        showSupplementary: true,
        showChangeAmount: false,
        showSupplementaryChargeOption: false,
        installmentReadOnly: false,
    },

    RENEW: {
        requiresExistingLoan: true,
        showInstallment: true,
        showTerms: true,
        showSupplementary: true,
        showChangeAmount: false,
        showSupplementaryChargeOption: true,
        installmentReadOnly: true,
    },

    TRANSFER: {
        requiresExistingLoan: false,
        showInstallment: true,
        showTerms: true,
        showSupplementary: true,
        showChangeAmount: false,
        showSupplementaryChargeOption: false,
        installmentReadOnly: false,
    },

    CHANGE: {
        requiresExistingLoan: true,
        showInstallment: false,
        showTerms: false,
        showSupplementary: false,
        showChangeAmount: true,
        showSupplementaryChargeOption: false,
        installmentReadOnly: false,
    },

    ADVANCE: {
        requiresExistingLoan: false,
        showInstallment: true,
        showTerms: true,
        showSupplementary: false,
        showChangeAmount: false,
        showSupplementaryChargeOption: false,
        installmentReadOnly: false,
    },

    RETURNEE: {
        requiresExistingLoan: false,
        showInstallment: true,
        showTerms: true,
        showSupplementary: true,
        showChangeAmount: false,
        showSupplementaryChargeOption: false,
        installmentReadOnly: false,
    },

    ADDITIONAL: {
        requiresExistingLoan: false,
        showInstallment: true,
        showTerms: true,
        showSupplementary: true,
        showChangeAmount: false,
        showSupplementaryChargeOption: false,
        installmentReadOnly: false,
    },
};
