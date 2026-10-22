type CalculateChargePaymentParams = {
    requiredAmount: number;
    amountToPay: number;
};

export function calculateChargePayment({
    requiredAmount,
    amountToPay,
}: CalculateChargePaymentParams) {
    if (
        !Number.isFinite(requiredAmount) ||
        !Number.isFinite(amountToPay) ||
        requiredAmount < 0 ||
        amountToPay < 0 ||
        amountToPay > requiredAmount
    ) {
        throw new Error("Invalid charge payment.");
    }

    const remainingBalance = Math.round(
        (requiredAmount - amountToPay) * 100
    ) / 100;

    const status =
        remainingBalance === 0
            ? "PAID"
            : amountToPay > 0
                ? "PARTIAL"
                : "UNPAID";

    return {
        requiredAmount,
        amountToPay,
        remainingBalance,
        status,
    };
}