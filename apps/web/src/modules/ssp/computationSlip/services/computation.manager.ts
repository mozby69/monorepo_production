import {
    TRANSACTION_TYPES,
    UDI_RATE,
    PROCESSING_FEE,
    COLLECTION_FEE,
    LOAN_PROTECTION_FEE,
    ICOD,
    CUT_OFF_DATE_UDI,
    CUT_OFF_DATE_FOR_EFFECTIVITY,

    getAge,
    calculateUDIAmount,
    calculateProcessingFee,
    calculateCollectionFee,
    calculateLoanProtectionFee,
    calculateICOD,
    calculateUDIRebateAmount,
    calculateLoanEffectivityDate,
    calculateSourceLoanBalance,
    calculateNetCashOut,
    formatDateApi,
} from "@repo/shared";

import type {
    ComputationManagerInput,
    SupplementaryCharge,
} from "./computation.manager.types";

import type {
    ComputationSchedules,
} from "./computationSchedule.types";

import {
    computationScheduleManager,
} from "./computationSchedule.manager";

function getOutstandingAmount(
    charge: SupplementaryCharge
): number {
    return Math.max(
        0,
        charge.chargeAmount - charge.paidAmount
    );
}

function mapCharge(charge: SupplementaryCharge) {
    return {
        ...charge,
        outstandingAmount: getOutstandingAmount(charge),
    };
}

function toDate(value: string): Date {
    const date = new Date(`${value}T00:00:00Z`);

    if (Number.isNaN(date.getTime())) {
        throw new Error(`Invalid date: ${value}`);
    }

    return date;
}

export function computationManager({
    values,
    pensioner,
    activeLoan,
    currentOutstandingCharges = [],
    carriedOutstandingCharges = [],
}: ComputationManagerInput) {
    const transactionDate = toDate(
        values.transactionDate
    );

    // Map the prototype's transaction identifiers to
    // the actual shared transaction constants.
    const transactionTypeMap = {
        NEW: TRANSACTION_TYPES.new,
        CLOSED_RENEW: TRANSACTION_TYPES.renew,
        TRANSFER: TRANSACTION_TYPES.transfer,
        CHANGE_13TH_MONTH: TRANSACTION_TYPES.change,
        RETURNEE: TRANSACTION_TYPES.returnee,
        ADDITIONAL: TRANSACTION_TYPES.additional,
    } as const;

    const transactionType =
        transactionTypeMap[values.transactionType];

    const isRenew =
        transactionType === TRANSACTION_TYPES.renew;

    const isChange =
        transactionType === TRANSACTION_TYPES.change;

    if ((isRenew || isChange) && !activeLoan) {
        throw new Error(
            "Select an existing loan account."
        );
    }

    const age = getAge(
        toDate(pensioner.birthDate)
    );

    const paidTermsBeforeRenewal =
        activeLoan?.paidTerms ?? 0;

    const supplementary =
        Number(values.supplementary) || 0;

    const supplementaryBalance =
        supplementary +
        Number(activeLoan?.supplementaryBalance ?? 0);

    const installment = isChange
        ? 0
        : isRenew
            ? Number(activeLoan?.installment ?? 0)
            : Number(values.installment);

    const applicableCollectionTerms = isRenew
        ? paidTermsBeforeRenewal
        : values.terms;

    const principalAmount = isChange
        ? 0
        : installment * values.terms;

    const udi = isChange
        ? 0
        : calculateUDIAmount({
            principalAmount,
            rate: UDI_RATE,
            terms: values.terms,
        });

    const processingFee = calculateProcessingFee({
        transactionType,
        terms: applicableCollectionTerms,
        fees: PROCESSING_FEE,
        age: Number(age),
    });

    const collectionFee = isChange
        ? 0
        : calculateCollectionFee({
            transactionType,
            amountFee: COLLECTION_FEE,
            terms: applicableCollectionTerms,
        });

    const loanProtectionFee = isChange
        ? 0
        : calculateLoanProtectionFee({
            terms: values.terms,
            amountFee: LOAN_PROTECTION_FEE,
        });

    const icod = isChange
        ? 0
        : calculateICOD({
            transactionType,
            lr: principalAmount,
            sl: supplementaryBalance,
            percentage: ICOD.percentage,
            existingAmountFee: ICOD.existingAmountFee,
            newMaximumFee: ICOD.newMaximumFee,
            originalTransactionDate: activeLoan
                ? toDate(activeLoan.transactionDate)
                : undefined,
            renewalTransactionDate: transactionDate,
        });

    const udiRebate =
        isRenew && activeLoan
            ? calculateUDIRebateAmount({
                originalTransactionDate: toDate(
                    activeLoan.transactionDate
                ),
                renewalTransactionDate: transactionDate,
                udi: activeLoan.udi,
                terms: activeLoan.terms,
                cutOffDate: CUT_OFF_DATE_UDI,
            })
            : 0;

    const effectivityDate =
        calculateLoanEffectivityDate({
            date: transactionDate,
            cutOffDate: CUT_OFF_DATE_FOR_EFFECTIVITY,
        });

    const sourceLoanBalance =
        isRenew && activeLoan
            ? calculateSourceLoanBalance({
                remainingBalance:
                    activeLoan.remainingBalance,
                installment,
                nextCollectionDate: toDate(
                    activeLoan.nextCollectionDate
                ),
                newEffectivityDate: effectivityDate,
            })
            : {
                projectedBalance: 0,
                collectionCount: 0,
            };

    console.log('activeLoan', activeLoan);
    console.log('complslip calc', sourceLoanBalance);

    // Renewal balance projection
    const shouldCreateSourceCollection =
        isRenew &&
        activeLoan !== null &&
        toDate(activeLoan.nextCollectionDate) <
        effectivityDate;

    const activeLoanBalance =
        isRenew && activeLoan
            ? shouldCreateSourceCollection
                ? sourceLoanBalance.projectedBalance
                : activeLoan.remainingBalance
            : 0;

    const sourceResidualBalance =
        isRenew && activeLoan
            ? Math.max(
                0,
                activeLoan.remainingBalance -
                activeLoanBalance
            )
            : 0;

    const sourceLoanStatus =
        sourceResidualBalance <= 0
            ? "CLOSED"
            : "RENEWED";

    // Supplementary charges
    const selectedCurrentCharges =
        isRenew
            ? currentOutstandingCharges.slice(
                0,
                Math.max(
                    0,
                    values.supplementaryChargeMonthsToPay
                )
            )
            : [];

    const currentSupplementaryCharge =
        selectedCurrentCharges.reduce(
            (total, charge) =>
                total + getOutstandingAmount(charge),
            0
        );

    const carriedSupplementaryCharge =
        isRenew
            ? carriedOutstandingCharges.reduce(
                (total, charge) =>
                    total + getOutstandingAmount(charge),
                0
            )
            : 0;

    const supplementaryChargeToPay =
        values.applySupplementaryCharge
            ? carriedSupplementaryCharge +
            currentSupplementaryCharge
            : 0;

    const changeAmount = isChange
        ? Number(values.changeAmount) || 0
        : 0;

    const cashOut = calculateNetCashOut({
        transactionType,
        principalAmount,
        udi,
        collectionFee,
        processingFee,
        loanProtectionFee,
        icod,
        supplementary,
        activeLoanBalance,
        udiRebate,
        supplementaryCharge:
            supplementaryChargeToPay,
        changeAmount,
    });

    const schedules = computationScheduleManager({
        effectivityDate,
        transactionDate: values.transactionDate,

        installment,
        loanTerms: values.terms,
        principalAmount,
        udi,

        supplementary,
        // Pass only the existing balance here.
        // The schedule manager adds the new supplementary amount.
        supplementaryBalance:
            activeLoan?.supplementaryBalance ?? 0,
    });

    return {
        pensionerId: values.pensionerId,
        accountNumber: values.accountNumber,
        transactionDate: values.transactionDate,
        transactionType,

        installment,
        terms: values.terms,
        changeAmount,

        supplementary,
        supplementaryBalance,

        principalAmount,
        udi,
        processingFee,
        collectionFee,
        loanProtectionFee,
        icod,
        udiRebate,

        effectivityDate: formatDateApi(effectivityDate),

        activeLoanBalance,
        sourceResidualBalance,
        sourceLoanStatus,

        carriedSupplementaryCharge,
        currentSupplementaryCharge,
        supplementaryChargeToPay,

        supplementaryChargeAvailableMonths:
            isRenew
                ? currentOutstandingCharges.length
                : 0,

        supplementaryChargeMonthsToPay:
            selectedCurrentCharges.length,

        supplementaryChargeRemainingMonths:
            Math.max(
                0,
                currentOutstandingCharges.length -
                selectedCurrentCharges.length
            ),

        supplementaryChargeBreakdown:
            selectedCurrentCharges.map(mapCharge),

        carriedSupplementaryChargeBreakdown:
            isRenew
                ? carriedOutstandingCharges.map(mapCharge)
                : [],

        grossCashOut: cashOut.grossCashout,
        netCashOut: cashOut.netCashOut,
        totalCashOut: cashOut.totalCashOut,

        renewedFromId: isRenew
            ? activeLoan?.id
            : undefined,

        shouldCreateSourceCollection,
        sourceCollectionCount:
            sourceLoanBalance.collectionCount,

        schedules
    };
}

export type ComputationManagerResult =
    ReturnType<typeof computationManager>;