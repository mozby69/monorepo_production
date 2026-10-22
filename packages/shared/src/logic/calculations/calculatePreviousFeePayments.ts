export type PreviousFeeBalance = {
    feeItemId: string;
    outstandingAmount: number;
};

export type PreviousFeePaymentInput = {
    feeItemId: string;
    amountToPay: number;
};

export function calculatePreviousFeePayments(
    balances: PreviousFeeBalance[],
    payments: PreviousFeePaymentInput[]
) {
    const balanceMap = new Map(
        balances.map((fee) => [
            fee.feeItemId,
            fee.outstandingAmount,
        ])
    );

    const seen = new Set<string>();
    let totalPayment = 0;

    const allocations = payments.map((payment) => {
        if (seen.has(payment.feeItemId)) {
            throw new Error(
                `Duplicate fee payment: ${payment.feeItemId}`
            );
        }

        seen.add(payment.feeItemId);

        const outstanding = balanceMap.get(payment.feeItemId);

        if (outstanding === undefined) {
            throw new Error(
                `Unknown outstanding fee: ${payment.feeItemId}`
            );
        }

        const amount = payment.amountToPay;

        if (
            !Number.isFinite(amount) ||
            amount < 0 ||
            !Number.isInteger(amount * 100)
        ) {
            throw new Error("Invalid fee payment amount");
        }

        if (amount > outstanding) {
            throw new Error(
                "Payment exceeds outstanding fee balance"
            );
        }

        totalPayment += amount;

        return {
            feeItemId: payment.feeItemId,
            amountToPay: amount,
            remainingBalance: Math.round(
                (outstanding - amount) * 100
            ) / 100,
        };
    });

    return {
        allocations,
        totalPayment: Math.round(totalPayment * 100) / 100,
    };
}