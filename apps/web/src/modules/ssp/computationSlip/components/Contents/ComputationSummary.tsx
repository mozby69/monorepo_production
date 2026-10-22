"use client";

import {
    Calculator,
    CalendarDays,
    CircleCheck,
    ReceiptText,
    Wallet,
    ArrowUpRight,
} from "lucide-react";

import { cn } from "@/utils/cn";

import type { ComputationManagerResult } from "../../services/computation.manager";

type ComputationSummaryProps = {
    result: ComputationManagerResult | null;
    isComplete?: boolean;
    onViewDetails?: () => void;
};

const currency = (value: number | null | undefined) => {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value ?? 0);
};


function SummaryRow({
    label,
    value,
    negative = false,
    highlight = false,
    className,
}: {
    label: string;
    value: number;
    negative?: boolean;
    highlight?: boolean;
    className?: string;
}) {
    return (
        <div className="flex items-center justify-between gap-4 py-2">
            <span className={cn(`text-sm text-slate-500`, className)}>
                {label}
            </span>

            <span
                className={cn(
                    `text-sm font-semibold tabular-nums ${highlight
                        ? "text-emerald-700"
                        : negative
                            ? "text-rose-600"
                            : "text-slate-900"
                    }`,
                    className
                )}
            >
                {negative && value > 0 ? "- " : ""}
                {currency(value)}
            </span>
        </div>
    );
}


export function ComputationSummary({
    result,
    isComplete = false,
    onViewDetails,
}: ComputationSummaryProps) {
    const hasResult = Boolean(result && isComplete);

    if (!hasResult || !result) {
        return (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                        <Calculator
                            size={20}
                            className="text-slate-500"
                        />
                    </div>

                    <div>
                        <h3 className="font-semibold text-slate-900">
                            Computation Summary
                        </h3>

                        <p className="text-xs text-slate-500">
                            Live calculation preview
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                        <Calculator
                            size={26}
                            className="text-slate-400"
                        />
                    </div>

                    <h4 className="text-sm font-semibold text-slate-700">
                        No computation yet
                    </h4>

                    <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                        Select a pensioner and complete the
                        required loan details to preview
                        the computation.
                    </p>
                </div>
            </div>
        );
    }

    const totalDeductedFees =
        result.selectedDeductions.icod +
        result.selectedDeductions.collectionFee +
        result.selectedDeductions.processingFee +
        result.selectedDeductions.loanProtectionFee;

    const previousOutstandingFeesDeducted =
        result.totalPreviousFeePayments;

    const combinedDeductedFees = Math.round(
        (
            totalDeductedFees +
            previousOutstandingFeesDeducted
        ) * 100
    ) / 100;

    const isRenewal =
        result.transactionType === "renew" ||
        result.activeLoanBalance > 0;

    const isNegativeCashOut =
        result !== null && result.totalCashOut < 0;

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2">
                    <ReceiptText
                        size={18}
                        className="text-slate-700"
                    />

                    <h3 className="font-semibold text-slate-900">
                        Computation Summary
                    </h3>
                </div>

                <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    <CircleCheck size={13} />
                    Calculated
                </div>
            </div>

            {/* Loan Computation */}
            <div className="px-4 py-3">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Loan Computation
                </h4>

                <div className="divide-y divide-slate-100">
                    <SummaryRow
                        label="Principal Amount"
                        value={result.principalAmount}
                    />

                    <SummaryRow
                        label="Unearned Discount Interest"
                        value={result.udi}
                        negative
                    />

                    <SummaryRow
                        label="Gross Cash Out"
                        value={result.grossCashOut}
                    />
                </div>
            </div>

            {/* Fees and Deductions */}
            <div className="border-t border-slate-100 px-4 py-3">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Fees and Deductions
                </h4>

                <div className="divide-y divide-slate-100">
                    <SummaryRow
                        label="Current Deducted Fees"
                        value={totalDeductedFees}
                        negative
                    />

                    {previousOutstandingFeesDeducted > 0 && (
                        <SummaryRow
                            label="Previous Outstanding Fees Deducted"
                            value={previousOutstandingFeesDeducted}
                            negative
                        />
                    )}

                    <SummaryRow
                        label="Total Fees Deducted"
                        value={combinedDeductedFees}
                        negative
                        className="font-semibold"
                    />
                </div>
            </div>

            {/* Renewal Adjustments */}
            {isRenewal && (
                <div className="border-t border-slate-100 px-4 py-3">
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Renewal Adjustments
                    </h4>

                    <div className="divide-y divide-slate-100">
                        <SummaryRow
                            label="Existing Loan Balance"
                            value={result.activeLoanBalance}
                            negative
                        />

                        <SummaryRow
                            label="UDI Rebate"
                            value={result.udiRebate}
                            highlight
                        />
                    </div>
                </div>
            )}

            {/* Supplementary */}
            {(result.supplementary > 0 ||
                result.supplementaryChargeToPay > 0) && (
                    <div className="border-t border-slate-100 px-4 py-3">
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Supplementary
                        </h4>

                        <div className="divide-y divide-slate-100">
                            <SummaryRow
                                label="Supplementary Amount"
                                value={result.supplementary}
                            />

                            {result.supplementaryChargeToPay > 0 && (
                                <SummaryRow
                                    label="Supplementary Charges"
                                    value={result.supplementaryChargeToPay}
                                    negative
                                />
                            )}
                        </div>
                    </div>
                )}

            {/* Effectivity Date */}
            <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays size={15} />
                    Effectivity Date
                </div>

                <span className="text-sm font-semibold text-slate-900">
                    {result.effectivityDate}
                </span>
            </div>

            {/* Final Total Cash Out */}
            <div className="border-t border-slate-200 bg-slate-50 px-4 py-5">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <Wallet size={16} />
                    Final Total Cash Out
                </div>

                <p
                    className={`mt-2 text-3xl font-bold tracking-tight tabular-nums ${isNegativeCashOut
                        ? "text-rose-600"
                        : "text-slate-900"
                        }`}
                >
                    {currency(result.totalCashOut)}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                    Amount after all applicable deductions and adjustments
                </p>
            </div>

            {/* Negative Cash Out Warning */}
            {isNegativeCashOut && (
                <div className="border-t border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    Negative available cash-out.
                    Please review and adjust the loan details.
                </div>
            )}

            {/* Optional Details Action */}
            {onViewDetails && (
                <div className="border-t border-slate-100 p-4">
                    <button
                        type="button"
                        onClick={onViewDetails}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        View Full Computation Details
                        <ArrowUpRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}