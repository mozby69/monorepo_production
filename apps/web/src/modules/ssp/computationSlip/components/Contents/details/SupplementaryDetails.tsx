"use client";

import { Wallet, CalendarDays } from "lucide-react";

import type {
    ComputationManagerResult,
} from "../../../services/computation.manager";

type SupplementaryDetailsProps = {
    result: ComputationManagerResult;
};

type Charge = ComputationManagerResult[
    "supplementaryChargeBreakdown"
][number];

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
}: {
    title: string;
    charges: Charge[];
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
                    No charges available.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-left text-xs text-slate-500">
                            <tr>
                                <th className="px-4 py-3 font-medium">
                                    Month
                                </th>

                                <th className="px-4 py-3 text-right font-medium">
                                    Charge
                                </th>

                                <th className="px-4 py-3 text-right font-medium">
                                    Paid
                                </th>

                                <th className="px-4 py-3 text-right font-medium">
                                    Outstanding
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {charges.map((charge) => (
                                <tr key={charge.id}>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        {charge.chargeMonth}
                                    </td>

                                    <td className="px-4 py-3 text-right tabular-nums">
                                        {currency(charge.chargeAmount)}
                                    </td>

                                    <td className="px-4 py-3 text-right tabular-nums">
                                        {currency(charge.paidAmount)}
                                    </td>

                                    <td className="px-4 py-3 text-right font-medium tabular-nums">
                                        {currency(charge.outstandingAmount)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export function SupplementaryDetails({
    result,
}: SupplementaryDetailsProps) {
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
                            {result.supplementaryChargeAvailableMonths}
                        </p>
                        <p className="text-xs text-slate-500">
                            Available
                        </p>
                    </div>

                    <div>
                        <p className="text-xl font-semibold">
                            {result.supplementaryChargeMonthsToPay}
                        </p>
                        <p className="text-xs text-slate-500">
                            Selected
                        </p>
                    </div>

                    <div>
                        <p className="text-xl font-semibold">
                            {result.supplementaryChargeRemainingMonths}
                        </p>
                        <p className="text-xs text-slate-500">
                            Remaining
                        </p>
                    </div>
                </div>
            </section>

            <ChargeTable
                title="Current Loan Charges"
                charges={result.supplementaryChargeBreakdown}
            />

            <ChargeTable
                title="Carried Supplementary Charges"
                charges={result.carriedSupplementaryChargeBreakdown}
            />

            <div className="rounded-xl bg-slate-900 p-5 text-white">
                <p className="text-sm text-slate-300">
                    Supplementary Charges Applied to Cash Out
                </p>

                <p className="mt-2 text-2xl font-bold tabular-nums">
                    {currency(result.supplementaryChargeToPay)}
                </p>
            </div>
        </div>
    );
}