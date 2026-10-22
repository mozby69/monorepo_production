"use client";

import type {
    PreviousOutstandingFee,
    PreviousFeePayment,
} from "../../../types/computationSlip.types";

type Props = {
    fees: PreviousOutstandingFee[];
    payments: PreviousFeePayment[];
    onChange: (payments: PreviousFeePayment[]) => void;
};

const currency = (value: number) =>
    new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
    }).format(value);

export function PreviousOutstandingFees({
    fees,
    payments,
    onChange,
}: Props) {
    if (fees.length === 0) {
        return null;
    }

    const totalSelectedPayments = payments.reduce(
        (total, payment) => total + payment.amountToPay,
        0
    );

    function updatePayment(
        feeItemId: string,
        amount: number
    ) {
        const fee = fees.find(
            (item) => item.feeItemId === feeItemId
        );

        if (!fee) return;

        const safeAmount = Math.min(
            Math.max(Number.isFinite(amount) ? amount : 0, 0),
            fee.outstandingAmount
        );

        const next = payments.filter(
            (payment) => payment.feeItemId !== feeItemId
        );

        if (safeAmount > 0) {
            next.push({
                feeItemId,
                amountToPay: safeAmount,
            });
        }

        onChange(next);
    }

    return (
        <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
            <div>
                <h3 className="text-sm font-semibold text-slate-900">
                    Previous Outstanding Fees
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                    Select amounts to deduct from this transaction.
                </p>
            </div>

            <div className="space-y-2">
                {fees.map((fee) => {
                    const payment =
                        payments.find(
                            (item) =>
                                item.feeItemId === fee.feeItemId
                        )?.amountToPay ?? 0;

                    return (
                        <div
                            key={fee.feeItemId}
                            className="space-y-3 rounded-lg border border-slate-200 p-3"
                        >
                            {/* Fee information */}
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-sm font-medium text-slate-900">
                                        {fee.deductionCode}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        {fee.transactionType} — {fee.loanId}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs text-slate-500">
                                        Outstanding
                                    </p>

                                    <p className="text-sm font-semibold tabular-nums text-slate-900">
                                        {currency(fee.outstandingAmount)}
                                    </p>
                                </div>
                            </div>

                            {/* Payment and remaining balance */}
                            <div className="flex items-end gap-3">
                                <label className="min-w-0 flex-1 text-xs text-slate-600">
                                    Amount to Deduct

                                    <input
                                        type="number"
                                        min={0}
                                        max={fee.outstandingAmount}
                                        step="0.01"
                                        value={payment}
                                        onChange={(event) =>
                                            updatePayment(
                                                fee.feeItemId,
                                                Number(event.target.value)
                                            )
                                        }
                                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                                    />
                                </label>

                                <div className="min-w-[110px] pb-2 text-right">
                                    <p className="text-xs text-slate-500">
                                        Remaining
                                    </p>

                                    <p className="text-sm font-semibold tabular-nums text-slate-900">
                                        {currency(
                                            fee.outstandingAmount - payment
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Total Previous Outstanding Fees Deducted */}
                            <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                                <span className="text-sm font-semibold text-[#1B2430]">
                                    Total Previous Fees to Deduct
                                </span>

                                <span className="text-base font-bold tabular-nums text-[#1B2430]">
                                    {currency(totalSelectedPayments)}
                                </span>
                            </div>
                        </div>

                    );
                })}
            </div>
        </section>
    );
}