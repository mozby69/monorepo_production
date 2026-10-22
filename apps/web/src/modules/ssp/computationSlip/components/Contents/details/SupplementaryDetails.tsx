
"use client";

import { Wallet, CalendarDays } from "lucide-react";

import type {
    ComputationManagerResult,
} from "../../../services/computation.manager";

type Charge = ComputationManagerResult[
    "supplementaryChargeBreakdown"
][number];

type SupplementaryDetailsProps = {
    result: ComputationManagerResult;

    selectedChargeIds: string[];

    onSelectedChargeIdsChange: (
        ids: string[]
    ) => void;
};

const currency = (value: number) =>
    new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
    }).format(value);

function AmountCard({
    label,
    amount,
}: {
    label: string;
    amount: number;
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-2 text-xl font-semibold tabular-nums text-slate-900">
                {currency(amount)}
            </p>
        </div>
    );
}

function ChargeTable({
    title,
    charges,
    selectedChargeIds,
    onToggle,
}: {
    title: string;
    charges: Charge[];
    selectedChargeIds: string[];
    onToggle: (id: string) => void;
}) {
    return (
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-5 py-4">
                <h3 className="font-semibold text-slate-900">
                    {title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                    {charges.length} charge record(s)
                </p>
            </div>

            {charges.length === 0 ? (
                <div className="px-5 py-8 text-center text-sm text-slate-500">
                    No outstanding charges.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-left text-xs text-slate-500">
                            <tr>
                                <th className="px-4 py-3">
                                    Pay
                                </th>
                                <th className="px-4 py-3">
                                    Month
                                </th>
                                <th className="px-4 py-3 text-right">
                                    Charge
                                </th>
                                <th className="px-4 py-3 text-right">
                                    Paid
                                </th>
                                <th className="px-4 py-3 text-right">
                                    Outstanding
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {charges.map((charge) => {
                                const checked =
                                    selectedChargeIds.includes(
                                        charge.id
                                    );

                                return (
                                    <tr key={charge.id}>
                                        <td className="px-4 py-3">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() =>
                                                    onToggle(
                                                        charge.id
                                                    )
                                                }
                                                className="h-4 w-4 accent-emerald-700"
                                            />
                                        </td>

                                        <td className="whitespace-nowrap px-4 py-3 text-black">
                                            {charge.chargeMonth}
                                        </td>

                                        <td className="px-4 py-3 text-right tabular-nums text-black">
                                            {currency(
                                                charge.chargeAmount
                                            )}
                                        </td>

                                        <td className="px-4 py-3 text-right tabular-nums text-black">
                                            {currency(
                                                charge.paidAmount
                                            )}
                                        </td>

                                        <td className="px-4 py-3 text-right font-medium tabular-nums text-black">
                                            {currency(
                                                charge.outstandingAmount
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export function SupplementaryDetails({
    result,
    selectedChargeIds,
    onSelectedChargeIdsChange,
}: SupplementaryDetailsProps) {

    const currentCharges =
        result.availableCurrentSupplementaryCharges;

    const carriedCharges =
        result.availableCarriedSupplementaryCharges;

    const allCharges = [
        ...currentCharges,
        ...carriedCharges,
    ];

    const selectedCharges = allCharges.filter(
        (charge) =>
            selectedChargeIds.includes(charge.id)
    );

    const selectedTotal = selectedCharges.reduce(
        (sum, charge) =>
            sum + charge.outstandingAmount,
        0
    );

    const toggleCharge = (id: string) => {
        const nextIds = selectedChargeIds.includes(id)
            ? selectedChargeIds.filter(
                (chargeId) => chargeId !== id
            )
            : [...selectedChargeIds, id];

        onSelectedChargeIdsChange(nextIds);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-3">
                    <Wallet
                        size={20}
                        className="text-blue-600"
                    />
                </div>

                <div>
                    <h3 className="font-semibold text-slate-900">
                        Supplementary Details
                    </h3>

                    <p className="text-xs text-slate-500">
                        Supplementary balances and charges
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <AmountCard
                    label="New Supplementary"
                    amount={result.supplementary}
                />

                <AmountCard
                    label="Total Supplementary Balance"
                    amount={result.supplementaryBalance}
                />

                <AmountCard
                    label="Carried Charges"
                    amount={result.carriedSupplementaryCharge}
                />

                <AmountCard
                    label="Current Charges"
                    amount={result.currentSupplementaryCharge}
                />
            </div>

            <section className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-2">
                    <CalendarDays
                        size={17}
                        className="text-slate-500"
                    />

                    <h3 className="font-semibold text-slate-900">
                        Charge Months
                    </h3>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                    <div>
                        <p className="text-xl font-semibold">
                            {allCharges.length}
                        </p>
                        <p className="text-xs text-slate-500">
                            Available
                        </p>
                    </div>

                    <div>
                        <p className="text-xl font-semibold">
                            {selectedCharges.length}
                        </p>
                        <p className="text-xs text-slate-500">
                            Selected
                        </p>
                    </div>

                    <div>
                        <p className="text-xl font-semibold">
                            {allCharges.length -
                                selectedCharges.length}
                        </p>
                        <p className="text-xs text-slate-500">
                            Remaining
                        </p>
                    </div>
                </div>
            </section>

            <ChargeTable
                title="Current Loan Charges"
                charges={currentCharges}
                selectedChargeIds={selectedChargeIds}
                onToggle={toggleCharge}
            />

            <ChargeTable
                title="Carried Supplementary Charges"
                charges={carriedCharges}
                selectedChargeIds={selectedChargeIds}
                onToggle={toggleCharge}
            />

            <div className="rounded-xl bg-slate-900 p-5 text-white">
                <p className="text-sm text-slate-300">
                    Supplementary Charges Selected
                </p>

                <p className="mt-2 text-2xl font-bold tabular-nums">
                    {currency(selectedTotal)}
                </p>
            </div>
        </div>
    );
}
