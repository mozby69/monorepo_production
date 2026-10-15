"use client";

import type { UseFormReturn } from "react-hook-form";

import {
    TRANSACTION_TYPE_OPTIONS,
} from "../../constants/computationSlip.constants";

import type {
    ActiveLoan,
    ComputationSlipFormValues,
    TransactionType,
} from "../../types/computationSlip.types";

type LoanDetailsFormProps = {
    form: UseFormReturn<ComputationSlipFormValues>;
    activeLoans: ActiveLoan[];
    onSelectLoan: (loan: ActiveLoan) => void;
};

const inputClass =
    "h-10 w-full rounded-md border border-gray-300 bg-white px-3 " +
    "text-sm text-[#1B2430] outline-none transition " +
    "focus:border-[#1F4B3F] focus:ring-2 focus:ring-[#1F4B3F]/10";

const labelClass =
    "mb-1.5 block text-xs font-medium text-gray-600";

export function LoanDetailsForm({
    form,
    activeLoans,
    onSelectLoan,
}: LoanDetailsFormProps) {
    const { register, watch, setValue } = form;

    const transactionType = watch("transactionType");

    const selectedAccountNumber = watch("accountNumber");

    const isRenew =
        transactionType === "CLOSED_RENEW";

    const isChange =
        transactionType === "CHANGE_13TH_MONTH";

    const requiresExistingLoan =
        isRenew || isChange;

    const showsInstallment =
        ["NEW", "CLOSED_RENEW", "ADDITIONAL", "RETURNEE"].includes(
            transactionType
        );

    const showsSupplementary =
        ["NEW", "CLOSED_RENEW", "ADDITIONAL", "RETURNEE"].includes(
            transactionType
        );

    function handleTransactionTypeChange(
        value: TransactionType
    ) {
        setValue("transactionType", value, {
            shouldDirty: true,
        });

        setValue("accountNumber", "");
        setValue("installment", 0);
        setValue("terms", 0);
        setValue("supplementary", 0);
        setValue("supplementaryBalance", 0);
        setValue("changeAmount", 0);
        setValue("applySupplementaryCharge", false);
        setValue("supplementaryChargeMonthsToPay", 0);
    }

    function handleLoanChange(accountNumber: string) {
        const loan = activeLoans.find(
            (item) => item.accountNumber === accountNumber
        );

        if (!loan) {
            return;
        }

        onSelectLoan(loan);
    }

    return (
        <section className="rounded-lg border border-[#E2E4E1] bg-white">
            <div className="border-b border-gray-100 px-5 py-4">
                <h3 className="text-base font-semibold text-[#1B2430]">
                    Loan Details
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                    Configure the transaction and loan terms.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2">
                <div>
                    <label className={labelClass}>
                        Transaction Date
                    </label>

                    <input
                        type="date"
                        {...register("transactionDate")}
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className={labelClass}>
                        Transaction Type
                    </label>

                    <select
                        value={transactionType}
                        onChange={(event) =>
                            handleTransactionTypeChange(
                                event.target.value as TransactionType
                            )
                        }
                        className={inputClass}
                    >
                        {TRANSACTION_TYPE_OPTIONS.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {requiresExistingLoan && (
                    <div className="sm:col-span-2">
                        <label className={labelClass}>
                            Existing Loan Account
                        </label>

                        <select
                            value={selectedAccountNumber}
                            onChange={(event) =>
                                handleLoanChange(event.target.value)
                            }
                            className={inputClass}
                        >
                            <option value="">
                                Select existing loan account
                            </option>

                            {activeLoans.map((loan) => (
                                <option
                                    key={loan.id}
                                    value={loan.accountNumber}
                                >
                                    {loan.accountNumber}
                                </option>
                            ))}
                        </select>

                        {activeLoans.length === 0 && (
                            <p className="mt-2 text-xs text-amber-700">
                                No active loan available for this transaction.
                            </p>
                        )}
                    </div>
                )}

                {showsInstallment && (
                    <>
                        <div>
                            <label className={labelClass}>
                                Monthly Installment
                            </label>

                            <input
                                type="number"
                                min={0}
                                step="0.01"
                                readOnly={isRenew}
                                {...register("installment", {
                                    valueAsNumber: true,
                                })}
                                className={`${inputClass} ${isRenew
                                    ? "bg-gray-50 text-gray-500"
                                    : ""
                                    }`}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Loan Terms (Months)
                            </label>

                            <input
                                type="number"
                                min={0}
                                {...register("terms", {
                                    valueAsNumber: true,
                                })}
                                className={inputClass}
                            />
                        </div>
                    </>
                )}

                {showsSupplementary && (
                    <div className="sm:col-span-2">
                        <label className={labelClass}>
                            Supplementary Loan Amount
                        </label>

                        <input
                            type="number"
                            min={0}
                            step="0.01"
                            {...register("supplementary", {
                                valueAsNumber: true,
                            })}
                            className={inputClass}
                        />
                    </div>
                )}

                {isChange && (
                    <div className="sm:col-span-2">
                        <label className={labelClass}>
                            Change Amount
                        </label>

                        <input
                            type="number"
                            min={0}
                            step="0.01"
                            {...register("changeAmount", {
                                valueAsNumber: true,
                            })}
                            className={inputClass}
                        />
                    </div>
                )}

                {isRenew && (
                    <div className="sm:col-span-2 space-y-4 rounded-md border border-gray-200 bg-gray-50 p-4">
                        <label className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    Pay Supplementary Charge
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    Include outstanding supplementary charges.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                {...register("applySupplementaryCharge")}
                                className="h-4 w-4 accent-[#1F4B3F]"
                            />
                        </label>

                        {watch("applySupplementaryCharge") && (
                            <div>
                                <label className={labelClass}>
                                    Months to Pay
                                </label>

                                <input
                                    type="number"
                                    min={1}
                                    {...register(
                                        "supplementaryChargeMonthsToPay",
                                        {
                                            valueAsNumber: true,
                                        }
                                    )}
                                    className={inputClass}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}