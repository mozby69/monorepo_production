"use client";

import { History, Landmark } from "lucide-react";

import type {
    ActiveLoan,
} from "../../../types/computationSlip.types";

import type {
    ComputationManagerResult,
} from "../../../services/computation.manager";

type ExistingLoanDetailsProps = {
    loan: ActiveLoan | null;
    result: ComputationManagerResult;
};

const currency = (value: number) =>
    new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
    }).format(value);

function DetailRow({
    label,
    value,
}: {
    label: string;
    value: React.ReactNode;
}) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0">
            <span className="text-sm text-slate-500">
                {label}
            </span>

            <span className="text-right text-sm font-semibold text-slate-900">
                {value}
            </span>
        </div>
    );
}

export function ExistingLoanDetails({
    loan,
    result,
}: ExistingLoanDetailsProps) {
    if (!loan) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                <History
                    size={28}
                    className="mx-auto text-slate-400"
                />

                <p className="mt-3 text-sm text-slate-500">
                    No existing loan selected.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <section className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center gap-3">
                    <Landmark
                        size={20}
                        className="text-slate-600"
                    />

                    <div>
                        <h3 className="font-semibold text-slate-900">
                            Existing Loan Account
                        </h3>

                        <p className="text-xs text-slate-500">
                            {loan.accountNumber}
                        </p>
                    </div>
                </div>

                <DetailRow
                    label="Loan Status"
                    value={loan.loanStatus}
                />

                <DetailRow
                    label="Original Principal"
                    value={currency(loan.principalAmount)}
                />

                <DetailRow
                    label="Monthly Installment"
                    value={currency(loan.installment)}
                />

                <DetailRow
                    label="Loan Terms"
                    value={`${loan.terms} months`}
                />

                <DetailRow
                    label="Paid Terms"
                    value={`${loan.paidTerms} months`}
                />

                <DetailRow
                    label="Current Remaining Balance"
                    value={currency(loan.remainingBalance)}
                />

                <DetailRow
                    label="Next Collection"
                    value={loan.nextCollectionDate}
                />
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="mb-3 font-semibold text-slate-900">
                    Renewal Projection
                </h3>

                <DetailRow
                    label="Balance Used in Computation"
                    value={currency(result.activeLoanBalance)}
                />

                <DetailRow
                    label="Source Residual Balance"
                    value={currency(result.sourceResidualBalance)}
                />

                <DetailRow
                    label="UDI Rebate"
                    value={currency(result.udiRebate)}
                />

                <DetailRow
                    label="Source Loan Status"
                    value={result.sourceLoanStatus}
                />

                <DetailRow
                    label="Projected Collections"
                    value={result.sourceCollectionCount}
                />

                <DetailRow
                    label="Source Collection Required"
                    value={
                        result.shouldCreateSourceCollection
                            ? "Yes"
                            : "No"
                    }
                />
            </section>
        </div>
    );
}