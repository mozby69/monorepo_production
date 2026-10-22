import type { ComputationManagerResult } from "../../../services/computation.manager";
import type { PreviousOutstandingFee } from "../../../types/computationSlip.types";
import { loanAccountsFixtures } from "../../../fixtures/loanAccounts.fixtures";

type FeeBreakdownProps = {
    result: ComputationManagerResult;
    previousOutstandingFees: PreviousOutstandingFee[];
};

const currency = (value: number) =>
    new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
    }).format(value);

function FeeRow({
    label,
    amount,
}: {
    label: string;
    amount: number;
}) {
    return (
        <div className="flex items-center justify-between gap-4 py-3">
            <span className="text-sm text-slate-600">
                {label}
            </span>

            <span className="font-medium tabular-nums text-slate-900">
                {currency(amount)}
            </span>
        </div>
    );
}

function DeductionRow({
    label,
    calculated,
    deducted,
}: {
    label: string;
    calculated: number;
    deducted: number;
}) {
    const outstanding = Math.round(
        (calculated - deducted) * 100
    ) / 100;

    return (
        <div className="grid grid-cols-4 items-center gap-3 border-b border-slate-100 py-3 last:border-0">
            <span className="text-sm font-medium text-slate-700">
                {label}
            </span>

            <span className="text-right text-sm tabular-nums text-slate-600">
                {currency(calculated)}
            </span>

            <span className="text-right text-sm font-medium tabular-nums text-rose-600">
                {currency(deducted)}
            </span>

            <span className="text-right text-sm font-medium tabular-nums text-amber-700">
                {currency(outstanding)}
            </span>
        </div>
    );
}

export function FeeBreakdown({
    result,
    previousOutstandingFees,
}: FeeBreakdownProps) {
    const deductions = result.selectedDeductions;

    const totalCalculatedFees =
        result.processingFee +
        result.collectionFee +
        result.loanProtectionFee +
        result.icod;

    const totalDeductedFees =
        deductions.processingFee +
        deductions.collectionFee +
        deductions.loanProtectionFee +
        deductions.icod;

    const totalOutstandingFees = Math.round(
        (totalCalculatedFees - totalDeductedFees) * 100
    ) / 100;

    const previousFeeDetails = previousOutstandingFees.map((fee) => {
        const originalLoan = loanAccountsFixtures.find(
            (loan) => loan.id === fee.loanId
        );

        const payment = result.previousFeePayments.find(
            (item) => item.feeItemId === fee.feeItemId
        );

        return {
            ...fee,
            accountNumber: originalLoan?.accountNo ?? `Loan #${fee.loanId}`,
            transactionDate: originalLoan?.availmentDate ?? null,
            loanStatus: originalLoan?.loanStatus ?? "UNKNOWN",
            amountToPay: payment?.amountToPay ?? 0,
            remainingAmount:
                fee.outstandingAmount - (payment?.amountToPay ?? 0),
        };
    });

    const groupedPreviousFees = Object.groupBy(
        previousFeeDetails,
        (fee) => String(fee.loanId)
    );

    return (
        <div className="space-y-6">
            {/* LOAN COMPUTATION */}
            <section className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-slate-900">
                    Loan Computation
                </h3>

                <div className="mt-3 divide-y divide-slate-100">
                    <FeeRow
                        label="Principal Amount"
                        amount={result.principalAmount}
                    />

                    <FeeRow
                        label="Unearned Discount Interest"
                        amount={result.udi}
                    />

                    <FeeRow
                        label="Gross Cash Out"
                        amount={result.grossCashOut}
                    />
                </div>
            </section>

            {/* DEDUCTIONS AND FEES */}
            <section className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-slate-900">
                    Deductions and Fees
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                    Calculated fees, actual deductions, and outstanding balances.
                </p>

                <div className="mt-4 overflow-x-auto">
                    <div className="min-w-[560px]">
                        {/* HEADER */}
                        <div className="grid grid-cols-4 gap-3 border-b border-slate-200 pb-3">
                            <span className="text-xs font-semibold text-slate-500">
                                Fee
                            </span>

                            <span className="text-right text-xs font-semibold text-slate-500">
                                Calculated
                            </span>

                            <span className="text-right text-xs font-semibold text-slate-500">
                                Deducted
                            </span>

                            <span className="text-right text-xs font-semibold text-slate-500">
                                Outstanding
                            </span>
                        </div>

                        <DeductionRow
                            label="Processing Fee"
                            calculated={result.processingFee}
                            deducted={deductions.processingFee}
                        />

                        <DeductionRow
                            label="Collection Fee"
                            calculated={result.collectionFee}
                            deducted={deductions.collectionFee}
                        />

                        <DeductionRow
                            label="Loan Protection Fee"
                            calculated={result.loanProtectionFee}
                            deducted={deductions.loanProtectionFee}
                        />

                        <DeductionRow
                            label="ICOD"
                            calculated={result.icod}
                            deducted={deductions.icod}
                        />

                        {/* TOTALS */}
                        <div className="grid grid-cols-4 gap-3 border-t-2 border-slate-200 pt-4">
                            <span className="text-sm font-semibold text-slate-900">
                                Total
                            </span>

                            <span className="text-right text-sm font-semibold tabular-nums">
                                {currency(totalCalculatedFees)}
                            </span>

                            <span className="text-right text-sm font-semibold tabular-nums text-rose-600">
                                {currency(totalDeductedFees)}
                            </span>

                            <span className="text-right text-sm font-semibold tabular-nums text-amber-700">
                                {currency(totalOutstandingFees)}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* PREVIOUS OUTSTANDING OBLIGATIONS */}
            {previousOutstandingFees.length > 0 && (
                <section className="rounded-xl border border-slate-200 bg-white p-5">
                    <h3 className="font-semibold text-slate-900">
                        Previous Outstanding Obligations
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                        Unpaid fees from previous loan transactions.
                        Obligations remain payable even after the original loan is closed.
                    </p>

                    <div className="mt-5 space-y-5">
                        {Object.entries(groupedPreviousFees).map(
                            ([loanId, fees]) => {
                                const originalLoan = fees?.[0];

                                return (
                                    <div
                                        key={loanId}
                                        className="overflow-hidden rounded-lg border border-slate-200"
                                    >
                                        {/* ORIGINAL LOAN INFORMATION */}
                                        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 px-4 py-3">
                                            <div>
                                                <p className="font-semibold text-slate-900">
                                                    {originalLoan?.accountNumber}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    {originalLoan?.transactionType}
                                                    {" · "}
                                                    {originalLoan?.transactionDate ?? "Date unavailable"}
                                                </p>
                                            </div>

                                            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600">
                                                {originalLoan?.loanStatus}
                                            </span>
                                        </div>

                                        {/* OUTSTANDING FEES */}
                                        <div className="divide-y divide-slate-100 px-4">
                                            {fees?.map((fee) => (
                                                <div
                                                    key={fee.feeItemId}
                                                    className="space-y-3 py-4"
                                                >
                                                    <div className="flex items-center justify-between gap-4">
                                                        <span className="font-medium text-slate-900">
                                                            {fee.deductionCode}
                                                        </span>

                                                        <span className="font-semibold text-amber-700">
                                                            {currency(fee.outstandingAmount)}
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                                                        <div>
                                                            <p className="text-xs text-slate-500">
                                                                Original Fee
                                                            </p>
                                                            <p className="mt-1 tabular-nums">
                                                                {currency(fee.originalAmount)}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p className="text-xs text-slate-500">
                                                                Previously Paid
                                                            </p>
                                                            <p className="mt-1 tabular-nums">
                                                                {currency(fee.paidAmount)}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p className="text-xs text-slate-500">
                                                                Paying Now
                                                            </p>
                                                            <p className="mt-1 font-medium tabular-nums text-rose-600">
                                                                {currency(fee.amountToPay)}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p className="text-xs text-slate-500">
                                                                Remaining
                                                            </p>
                                                            <p className="mt-1 font-semibold tabular-nums text-amber-700">
                                                                {currency(fee.remainingAmount)}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="text-xs text-slate-400">
                                                        Fee Reference: {fee.feeItemId}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>

                    <div className="mt-5 border-t border-slate-200 pt-4">
                        <FeeRow
                            label="Total Previous Fees Deducted"
                            amount={result.totalPreviousFeePayments}
                        />
                    </div>
                </section>
            )}

            {/* RENEWAL ADJUSTMENTS */}
            {(result.transactionType === "renew" ||
                result.activeLoanBalance > 0) && (
                    <section className="rounded-xl border border-slate-200 bg-white p-5">
                        <h3 className="font-semibold text-slate-900">
                            Renewal Adjustments
                        </h3>

                        <div className="mt-3 divide-y divide-slate-100">
                            <FeeRow
                                label="Active Loan Balance"
                                amount={result.activeLoanBalance}
                            />

                            <FeeRow
                                label="UDI Rebate"
                                amount={result.udiRebate}
                            />

                            <FeeRow
                                label="Supplementary Charge"
                                amount={result.supplementaryChargeToPay}
                            />
                        </div>
                    </section>
                )}

            {/* TOTAL CASH OUT */}
            <section className="rounded-xl bg-slate-900 p-5 text-white">
                <p className="text-sm text-slate-300">
                    Total Cash Out
                </p>

                <p className="mt-2 text-3xl font-bold tabular-nums">
                    {currency(result.totalCashOut)}
                </p>
            </section>
        </div>
    );
}