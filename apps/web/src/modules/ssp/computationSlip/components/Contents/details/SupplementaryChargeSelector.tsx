"use client";

import type {
    SupplementaryLoanCharge,
} from "../../../types/ssp-supplementary.types";

type Props = {
    charges: SupplementaryLoanCharge[];
    selectedIds: number[];
    availableCashOut: number;

    onToggle: (id: number) => void;
    onClear: () => void;
    onSelectAffordable: () => void;
};

const money = (value: number) =>
    new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
    }).format(value);

export function SupplementaryChargeSelector({
    charges,
    selectedIds,
    availableCashOut,
    onToggle,
    onClear,
    onSelectAffordable,
}: Props) {
    const selectedTotal = charges
        .filter((charge) =>
            selectedIds.includes(charge.id)
        )
        .reduce(
            (sum, charge) =>
                sum + charge.interestAmount,
            0
        );

    const remainingCashOut =
        availableCashOut - selectedTotal;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-semibold">
                        Outstanding SL Charges
                    </h3>

                    <p className="text-sm text-gray-500">
                        Select the months to deduct
                        from this computation.
                    </p>
                </div>

                <span className="text-sm text-gray-500">
                    {charges.length} months
                </span>
            </div>

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={onSelectAffordable}
                    className="rounded-md border px-3 py-2 text-sm"
                >
                    Pay Oldest Affordable
                </button>

                <button
                    type="button"
                    onClick={onClear}
                    className="rounded-md border px-3 py-2 text-sm"
                >
                    Clear
                </button>
            </div>

            <div className="divide-y rounded-lg border">
                {charges.map((charge) => (
                    <label
                        key={charge.id}
                        className="flex cursor-pointer items-center justify-between p-3"
                    >
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(
                                    charge.id
                                )}
                                onChange={() =>
                                    onToggle(charge.id)
                                }
                            />

                            <div>
                                <p className="text-sm font-medium">
                                    {charge.yearEffectivity}-
                                    {String(
                                        charge.monthEffectivity
                                    ).padStart(2, "0")}
                                </p>

                                <p className="text-xs text-gray-500">
                                    Due: {charge.dueDate}
                                </p>
                            </div>
                        </div>

                        <span className="font-semibold">
                            {money(
                                charge.interestAmount
                            )}
                        </span>
                    </label>
                ))}
            </div>

            <div className="space-y-2 rounded-lg bg-gray-50 p-4">
                <div className="flex justify-between text-sm">
                    <span>Available cash-out</span>
                    <span>
                        {money(availableCashOut)}
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span>Selected charges</span>
                    <span>
                        {money(selectedTotal)}
                    </span>
                </div>

                <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Remaining cash-out</span>
                    <span
                        className={
                            remainingCashOut < 0
                                ? "text-red-600"
                                : "text-green-700"
                        }
                    >
                        {money(remainingCashOut)}
                    </span>
                </div>

                {remainingCashOut < 0 && (
                    <p className="text-xs text-red-600">
                        Selected charges exceed
                        the available cash-out.
                    </p>
                )}
            </div>
        </div>
    );
}