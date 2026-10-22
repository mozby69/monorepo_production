
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
    calculateNetCashOut,
    formatDateApi,
    calculateChargePayment,
    calculateSelectedDeductions,
    calculatePreviousFeePayments,
} from "@repo/shared";

import type {
    ComputationManagerInput,
    SupplementaryCharge,
} from "./computation.manager.types";

import {
    computationScheduleManager,
} from "./computationSchedule.manager";

import {
    analyzeLoanCollections,
} from "./computationCollection.manager";

import {
    calculateRenewalProjection,
} from "./computationRenewal.manager";

import {
    calculateSelectedSupplementaryCharges,
} from "./computationSupplementaryCharges.manager";

// =====================================================
// HELPERS
// =====================================================

function toDate(value: string): Date {
    const date = new Date(`${value}T00:00:00Z`);

    if (Number.isNaN(date.getTime())) {
        throw new Error(`Invalid date: ${value}`);
    }

    return date;
}

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

// =====================================================
// COMPUTATION MANAGER
// =====================================================

export function computationManager({
    values,
    pensioner,
    activeLoan,
    availableChangeAmount,
    currentOutstandingCharges = [],
    carriedOutstandingCharges = [],
    previousOutstandingFees,
    loanCollections = [],
}: ComputationManagerInput) {

    // =================================================
    // 1. TRANSACTION INFORMATION
    // =================================================

    const transactionDate = toDate(
        values.transactionDate
    );

    const transactionTypeMap = {
        NEW: TRANSACTION_TYPES.new,
        RENEW: TRANSACTION_TYPES.renew,
        TRANSFER: TRANSACTION_TYPES.transfer,
        CHANGE: TRANSACTION_TYPES.change,
        ADVANCE: TRANSACTION_TYPES.advance,
        RETURNEE: TRANSACTION_TYPES.returnee,
        ADDITIONAL: TRANSACTION_TYPES.additional,
    } as const;

    const transactionType =
        transactionTypeMap[values.transactionType];

    if (!transactionType) {
        throw new Error("Invalid transaction type.");
    }

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

    // =================================================
    // 2. LOAN INFORMATION
    // =================================================

    const supplementary =
        Number(values.supplementary) || 0;

    const existingSupplementaryBalance =
        Number(activeLoan?.supplementaryBalance ?? 0);

    const supplementaryBalance =
        existingSupplementaryBalance + supplementary;

    const installment = isChange
        ? 0
        : isRenew
            ? Number(activeLoan?.installment ?? 0)
            : Number(values.installment);

    const principalAmount = isChange
        ? 0
        : installment * values.terms;

    // =================================================
    // 3. LOAN EFFECTIVITY
    // =================================================

    const effectivityDate =
        calculateLoanEffectivityDate({
            date: transactionDate,
            cutOffDate: CUT_OFF_DATE_FOR_EFFECTIVITY,
        });

    const effectivityDateString =
        formatDateApi(effectivityDate);

    // =================================================
    // 4. ACTUAL COLLECTION ANALYSIS
    // =================================================

    const collectionAnalysis =
        isRenew && activeLoan
            ? analyzeLoanCollections(
                activeLoan.id,
                activeLoan.installment,
                loanCollections,
                values.transactionDate
            )
            : null;

    const actualPaidTerms =
        collectionAnalysis?.actualPaidTerms ??
        activeLoan?.paidTerms ??
        0;

    // =================================================
    // 5. RENEWAL PROJECTION
    // =================================================

    const renewalProjection =
        isRenew && activeLoan && collectionAnalysis
            ? calculateRenewalProjection({
                loan: {
                    id: activeLoan.id,

                    loanStatus:
                        activeLoan.loanStatus,

                    monthEffectivity: Number(
                        activeLoan.effectivityDate.slice(
                            5,
                            7
                        )
                    ),

                    yearEffectivity: Number(
                        activeLoan.effectivityDate.slice(
                            0,
                            4
                        )
                    ),

                    terms: activeLoan.terms,
                },

                currentBalance:
                    activeLoan.remainingBalance,

                installment:
                    activeLoan.installment,

                transactionDate:
                    values.transactionDate,

                newEffectivityDate:
                    effectivityDateString,

                settledPeriodIndexes:
                    collectionAnalysis.settledPeriodIndexes,
            })
            : null;

    const projectedLRCollections =
        renewalProjection?.projectedLRCollections ?? 0;

    const projectedPaidTerms =
        renewalProjection?.projectedPaidTerms ?? 0;

    const effectivePaidTerms =
        actualPaidTerms + projectedPaidTerms;

    const activeLoanBalance =
        isRenew && activeLoan
            ? renewalProjection
                ?.projectedSourceLoanBalance
            ?? activeLoan.remainingBalance
            : 0;

    const sourceResidualBalance =
        isRenew && activeLoan
            ? Math.max(0, activeLoanBalance)
            : 0;

    const sourceLoanStatus =
        !isRenew || !activeLoan
            ? null
            : "RENEWED";

    // Projection indicator only.
    // Do not post actual collections here.
    const shouldCreateSourceCollection =
        isRenew &&
        projectedLRCollections > 0;

    // =================================================
    // 6. PRINCIPAL / UDI
    // =================================================

    const udi = isChange
        ? 0
        : calculateUDIAmount({
            principalAmount,
            rate: UDI_RATE,
            terms: values.terms,
        });

    // Preserve the original renewal fee basis.
    // This uses the effective paid terms after projection.
    const applicableCollectionTerms = isRenew
        ? effectivePaidTerms
        : values.terms;

    // =================================================
    // 7. FEES
    // =================================================

    const processingFee =
        calculateProcessingFee({
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

    // 1. Calculate the required ICOD
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

            renewalTransactionDate:
                transactionDate,
        });


    // 2. Determine how much ICOD to pay
    // If the user hasn't overridden it, pay the full amount.
    const icodAmountToPay =
        values.icodAmountToPay == null
            ? icod
            : Number(values.icodAmountToPay);

    // 3. Calculate payment and remaining balance
    const icodPayment = calculateChargePayment({
        requiredAmount: icod,
        amountToPay: icodAmountToPay,
    });

    // =================================================
    // 8. UDI REBATE
    // =================================================

    const udiRebate =
        isRenew && activeLoan
            ? calculateUDIRebateAmount({
                originalTransactionDate: toDate(
                    activeLoan.transactionDate
                ),

                renewalTransactionDate:
                    transactionDate,

                udi: activeLoan.udi,
                terms: activeLoan.terms,
                cutOffDate: CUT_OFF_DATE_UDI,
            })
            : 0;

    // =================================================
    // 9. SUPPLEMENTARY CHARGE SELECTION
    // =================================================

    // All charges from the current and carried loans
    const allOutstandingCharges = [
        ...carriedOutstandingCharges,
        ...currentOutstandingCharges,
    ];

    // Remove duplicate charges by ID
    const uniqueOutstandingCharges = [
        ...new Map(
            allOutstandingCharges.map((charge) => [
                charge.id,
                charge,
            ])
        ).values(),
    ];

    // IDs selected by counter staff
    const selectedChargeIds: string[] =
        values.applySupplementaryCharge
            ? values.selectedSupplementaryChargeIds ?? []
            : [];

    // Validate selected IDs
    const availableChargeIds = new Set(
        uniqueOutstandingCharges.map(
            (charge) => charge.id
        )
    );

    if (
        selectedChargeIds.some(
            (id) => !availableChargeIds.has(id)
        )
    ) {
        throw new Error(
            "One or more selected SL charges are invalid."
        );
    }

    // =================================================
    // AVAILABLE CHARGES (FOR DISPLAY)
    // =================================================

    // All available current charges
    const availableCurrentCharges =
        currentOutstandingCharges.map(mapCharge);

    // All available carried charges
    const availableCarriedCharges =
        carriedOutstandingCharges.map(mapCharge);

    // =================================================
    // SELECTED CHARGES (FOR COMPUTATION)
    // =================================================

    const selectedCharges =
        uniqueOutstandingCharges.filter(
            (charge) =>
                selectedChargeIds.includes(charge.id)
        );

    const selectedCurrentCharges =
        currentOutstandingCharges.filter(
            (charge) =>
                selectedChargeIds.includes(charge.id)
        );

    const selectedCarriedCharges =
        carriedOutstandingCharges.filter(
            (charge) =>
                selectedChargeIds.includes(charge.id)
        );

    // =================================================
    // SELECTED CHARGE TOTALS
    // =================================================

    const currentSupplementaryCharge =
        selectedCurrentCharges.reduce(
            (total, charge) =>
                total + getOutstandingAmount(charge),
            0
        );

    const carriedSupplementaryCharge =
        selectedCarriedCharges.reduce(
            (total, charge) =>
                total + getOutstandingAmount(charge),
            0
        );

    // =================================================
    // CHARGES AVAILABLE FOR SELECTION
    // =================================================

    const selectableCharges =
        uniqueOutstandingCharges.map(
            (charge) => ({
                id: charge.id,
                interestAmount:
                    getOutstandingAmount(charge),
            })
        );
    // =================================================
    // 10. CHANGE AMOUNT
    // =================================================

    const changeAmount = isChange
        ? Number(values.changeAmount)
        : 0;

    if (isChange) {
        if (!Number.isFinite(changeAmount) || changeAmount <= 0) {
            throw new Error(
                "CHANGE amount must be greater than zero."
            );
        }

        if (availableChangeAmount == null) {
            throw new Error(
                "Available CHANGE balance is required."
            );
        }

        if (changeAmount > availableChangeAmount) {
            throw new Error(
                "CHANGE amount exceeds available balance."
            );
        }
    }

    // =================================================
    // 11. CASH-OUT BEFORE SL CHARGES
    // =================================================

    // Current transaction deductions
    // CHANGE generates only a processing fee.
    const selectedDeductions = calculateSelectedDeductions({
        selectedCodes: isChange
            ? ["PROC_FEE"]
            : values.selectedDeductionCodes ?? [],

        icod: isChange ? 0 : icodPayment.amountToPay,

        collectionFee: isChange ? 0 : collectionFee,

        processingFee,

        loanProtectionFee: isChange ? 0 : loanProtectionFee,
    });

    // Payments against fees from previous transactions
    const previousFeePaymentResult =
        calculatePreviousFeePayments(
            previousOutstandingFees.map((fee) => ({
                feeItemId: fee.feeItemId,
                outstandingAmount: fee.outstandingAmount,
            })),
            values.previousFeePayments ?? []
        );

    // Preliminary cash-out before supplementary charges
    const cashOutBeforeSLChargesBase = calculateNetCashOut({
        transactionType,
        principalAmount,
        udi,

        collectionFee: selectedDeductions.collectionFee,
        processingFee: selectedDeductions.processingFee,
        loanProtectionFee: selectedDeductions.loanProtectionFee,
        icod: selectedDeductions.icod,

        supplementary,
        activeLoanBalance,
        udiRebate,

        supplementaryCharge: 0,
        changeAmount,
    });

    // Deduct previous outstanding fee payments once

    const cashOutBeforeSLCharges = {
        ...cashOutBeforeSLChargesBase,

        totalCashOut: Math.round(
            (
                cashOutBeforeSLChargesBase.totalCashOut -
                previousFeePaymentResult.totalPayment
            ) * 100
        ) / 100,
    };

    // =================================================
    // 12. SELECTED SL CHARGE CALCULATION
    // =================================================

    const chargeSelection =
        calculateSelectedSupplementaryCharges(
            selectableCharges,
            selectedChargeIds,
            cashOutBeforeSLCharges.totalCashOut
        );

    // Negative cash-out is allowed for review.
    const supplementaryChargeToPay =
        chargeSelection.selectedTotal;

    // =================================================
    // 13. FINAL CASH-OUT
    // =================================================

    // Calculate final cash-out with current deductions
    // and selected supplementary charges.

    const finalCashOutBase = calculateNetCashOut({
        transactionType,
        principalAmount,
        udi,

        collectionFee: selectedDeductions.collectionFee,
        processingFee: selectedDeductions.processingFee,
        loanProtectionFee: selectedDeductions.loanProtectionFee,
        icod: selectedDeductions.icod,

        supplementary,
        activeLoanBalance,
        udiRebate,

        supplementaryCharge: supplementaryChargeToPay,

        changeAmount,
    });

    // Apply previous outstanding fee payments
    const cashOut = {
        ...finalCashOutBase,

        totalCashOut: Math.round(
            (
                finalCashOutBase.totalCashOut -
                previousFeePaymentResult.totalPayment
            ) * 100
        ) / 100,
    };

    // =================================================
    // 14. LOAN SCHEDULES
    // =================================================

    const schedules =
        computationScheduleManager({
            effectivityDate,
            transactionDate:
                values.transactionDate,

            installment,
            loanTerms: values.terms,
            principalAmount,
            udi,

            supplementary,

            // Existing SL balance only.
            // The schedule manager adds the new SL.
            supplementaryBalance:
                existingSupplementaryBalance,
        });

    // =================================================
    // 15. RETURN COMPUTATION RESULT
    // =================================================

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

        icodAmountToPay: icodPayment.amountToPay,

        icodRemainingBalance: icodPayment.remainingBalance,

        icodPaymentStatus: icodPayment.status,


        udiRebate,

        effectivityDate: effectivityDateString,

        // Existing LR settlement
        activeLoanBalance,
        sourceResidualBalance,
        sourceLoanStatus,

        actualPaidTerms,
        projectedPaidTerms,
        effectivePaidTerms,

        projectedLRCollections,

        projectedLRPeriods:
            renewalProjection?.projectedLRPeriods ?? [],

        shouldCreateSourceCollection,

        sourceCollectionCount:
            renewalProjection?.projectedPaidTerms ?? 0,

        // Supplementary charges
        carriedSupplementaryCharge,
        currentSupplementaryCharge,
        supplementaryChargeToPay,

        supplementaryChargeAvailableMonths:
            uniqueOutstandingCharges.length,

        supplementaryChargeMonthsToPay:
            selectedCharges.length,

        supplementaryChargeRemainingMonths:
            chargeSelection.remainingCharges.length,

        supplementaryChargeBreakdown:
            selectedCharges.map(mapCharge),

        carriedSupplementaryChargeBreakdown:
            selectedCarriedCharges.map(mapCharge),

        selectedSupplementaryChargeIds:
            chargeSelection.selectedChargeIds,

        remainingSupplementaryCharges:
            chargeSelection.remainingCharges,

        cashOutBeforeSLCharges:
            cashOutBeforeSLCharges.totalCashOut,

        // Cash-out
        grossCashOut: cashOut.grossCashout,
        netCashOut: cashOut.netCashOut,
        totalCashOut: cashOut.totalCashOut,

        renewedFromId:
            isRenew
                ? activeLoan?.id
                : undefined,

        // Schedules
        schedules,

        selectedDeductions,

        // All available charges for the UI
        availableCurrentSupplementaryCharges:
            availableCurrentCharges,

        availableCarriedSupplementaryCharges:
            availableCarriedCharges,

        previousFeePayments:
            previousFeePaymentResult.allocations,

        totalPreviousFeePayments:
            previousFeePaymentResult.totalPayment,
    };
}

export type ComputationManagerResult =
    ReturnType<typeof computationManager>;
