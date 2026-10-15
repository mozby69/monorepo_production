import type {
    ComputationManagerResult,
} from "../../../services/computation.manager";

type FeeBreakdownProps = {
    result: ComputationManagerResult;
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

export function FeeBreakdown({
    result,
}: FeeBreakdownProps) {
    return (
        <div className="space-y-6">
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

            <section className="rounded-xl border border-slate-200 bg-white p-5">
                <h3 className="font-semibold text-slate-900">
                    Deductions and Fees
                </h3>

                <div className="mt-3 divide-y divide-slate-100">
                    <FeeRow
                        label="Processing Fee"
                        amount={result.processingFee}
                    />

                    <FeeRow
                        label="Collection Fee"
                        amount={result.collectionFee}
                    />

                    <FeeRow
                        label="Loan Protection Fee"
                        amount={result.loanProtectionFee}
                    />

                    <FeeRow
                        label="ICOD"
                        amount={result.icod}
                    />
                </div>
            </section>

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