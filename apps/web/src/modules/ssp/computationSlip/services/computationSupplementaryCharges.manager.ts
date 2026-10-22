
export interface SelectableSupplementaryCharge {
    id: string;
    interestAmount: number;
}

export interface SupplementaryChargeSelection {
    selectedCharges: SelectableSupplementaryCharge[];
    remainingCharges: SelectableSupplementaryCharge[];
    selectedChargeIds: string[];

    selectedTotal: number;
    outstandingTotal: number;
    remainingCashOut: number;
    isAffordable: boolean;
}

export function calculateSelectedSupplementaryCharges(
    unpaidCharges: SelectableSupplementaryCharge[],
    selectedChargeIds: string[],
    availableCashOut: number
): SupplementaryChargeSelection {

    // Negative cash-out is allowed.
    // Only reject invalid numeric values.
    if (!Number.isFinite(availableCashOut)) {
        throw new Error(
            "Invalid available cash-out calculation."
        );
    }

    const ids = new Set(selectedChargeIds);

    if (ids.size !== selectedChargeIds.length) {
        throw new Error(
            "Duplicate supplementary charge selection."
        );
    }

    const chargeMap = new Map(
        unpaidCharges.map((charge) => [
            charge.id,
            charge,
        ])
    );

    for (const id of ids) {
        if (!chargeMap.has(id)) {
            throw new Error(
                `Supplementary charge ${id} is invalid or already paid.`
            );
        }
    }

    // Validate all available charges, including unselected ones.
    for (const charge of unpaidCharges) {
        if (
            !Number.isFinite(charge.interestAmount) ||
            charge.interestAmount < 0
        ) {
            throw new Error(
                `Invalid amount for SL charge ${charge.id}.`
            );
        }
    }

    const selectedCharges = unpaidCharges.filter(
        (charge) => ids.has(charge.id)
    );

    const remainingCharges = unpaidCharges.filter(
        (charge) => !ids.has(charge.id)
    );

    const selectedTotal = selectedCharges.reduce(
        (sum, charge) =>
            sum + charge.interestAmount,
        0
    );

    const outstandingTotal = remainingCharges.reduce(
        (sum, charge) =>
            sum + charge.interestAmount,
        0
    );

    const remainingCashOut =
        availableCashOut - selectedTotal;

    return {
        selectedCharges,
        remainingCharges,

        selectedChargeIds:
            selectedCharges.map((charge) => charge.id),

        selectedTotal,
        outstandingTotal,
        remainingCashOut,

        // Informational only.
        // A false value must not block the preview.
        isAffordable: remainingCashOut >= 0,
    };
}

export function selectOldestAffordableCharges(
    unpaidCharges: Array<
        SelectableSupplementaryCharge & {
            dueDate: string;
        }
    >,
    availableCashOut: number
): string[] {

    // Automatic selection is disabled when
    // there is no positive cash-out.
    // Manual charge selection remains available.
    if (
        !Number.isFinite(availableCashOut) ||
        availableCashOut < 0
    ) {
        return [];
    }

    const sorted = [...unpaidCharges].sort(
        (a, b) =>
            a.dueDate.localeCompare(b.dueDate) ||
            a.id.localeCompare(b.id)
    );

    const selectedIds: string[] = [];
    let total = 0;

    for (const charge of sorted) {
        if (
            !Number.isFinite(charge.interestAmount) ||
            charge.interestAmount < 0
        ) {
            throw new Error(
                `Invalid amount for SL charge ${charge.id}.`
            );
        }

        if (
            total + charge.interestAmount >
            availableCashOut
        ) {
            break;
        }

        selectedIds.push(charge.id);
        total += charge.interestAmount;
    }

    return selectedIds;
}
