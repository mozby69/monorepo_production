"use client";

import { Landmark, CheckCircle2 } from "lucide-react";

import type {
    ActiveLoan,
} from "../../types/computationSlip.types";

type ActiveLoanListProps = {
    loans: ActiveLoan[];
    selectedAccountNumber?: string;
    onSelect?: (loan: ActiveLoan) => void;
};

const currency = (amount: number) =>
    new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
    }).format(amount);

export function ActiveLoanList({
    loans,
    selectedAccountNumber,
    onSelect,
}: ActiveLoanListProps) {
    return (
        <section className="rounded-lg border border-[#E2E4E1] bg-white">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <div>
                    <h3 className="text-base font-semibold text-[#1B2430]">
                        Active Loan Accounts
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                        Existing loan accounts for this pensioner
                    </p>
                </div>

                <span className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {loans.length} accounts
                </span>
            </div>

            {loans.length === 0 ? (
                <div className="px-5 py-10 text-center">
                    <Landmark
                        size={28}
                        className="mx-auto mb-3 text-gray-300"
                    />

                    <p className="text-sm font-medium text-gray-700">
                        No active loan accounts
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                        This pensioner has no existing active loans.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-xs text-gray-500">
                            <tr>
                                <th className="px-5 py-3 text-left font-medium">
                                    Account Number
                                </th>
                                <th className="px-5 py-3 text-right font-medium">
                                    Installment
                                </th>
                                <th className="px-5 py-3 text-right font-medium">
                                    Remaining Balance
                                </th>
                                <th className="px-5 py-3 text-center font-medium">
                                    Paid Terms
                                </th>
                                <th className="px-5 py-3 text-center font-medium">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {loans.map((loan) => {
                                const selected =
                                    selectedAccountNumber ===
                                    loan.accountNumber;

                                return (
                                    <tr
                                        key={loan.id}
                                        onClick={() => onSelect?.(loan)}
                                        className={`border-t border-gray-100 transition ${onSelect
                                            ? "cursor-pointer hover:bg-gray-50"
                                            : ""
                                            } ${selected ? "bg-green-50/60" : ""
                                            }`}
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                {selected && (
                                                    <CheckCircle2
                                                        size={16}
                                                        className="text-green-700"
                                                    />
                                                )}

                                                <span className="font-medium text-[#1B2430]">
                                                    {loan.accountNumber}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-right tabular-nums">
                                            {currency(loan.installment)}
                                        </td>

                                        <td className="px-5 py-4 text-right font-medium tabular-nums">
                                            {currency(loan.remainingBalance)}
                                        </td>

                                        <td className="px-5 py-4 text-center">
                                            {loan.paidTerms} / {loan.terms}
                                        </td>

                                        <td className="px-5 py-4 text-center">
                                            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                                {loan.loanStatus}
                                            </span>
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