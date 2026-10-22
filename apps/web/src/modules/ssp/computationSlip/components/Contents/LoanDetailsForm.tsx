"use client";

import type { UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { TRANSACTION_TYPE_OPTIONS } from "../../constants/computationSlip.constants";
import { TRANSACTION_FIELD_CONFIG, } from "../../constants/computationTransaction.config";
import type { ActiveLoan, ComputationSlipFormValues, TransactionType } from "../../types/computationSlip.types";
import { DEDUCTION_OPTIONS, DeductionCode } from "@repo/shared";

type LoanDetailsFormProps = {
    form: UseFormReturn<ComputationSlipFormValues>;
    activeLoans: ActiveLoan[];
    onSelectLoan: (loan: ActiveLoan) => void;
    calculatedICOD?: number;
    availableChangeAmount: number;
};

const inputClass =
    "h-9 w-full rounded-md border border-gray-300 bg-white px-3 " +
    "text-sm text-[#1B2430] outline-none transition " +
    "focus:border-[#1F4B3F] focus:ring-2 focus:ring-[#1F4B3F]/10";

const labelClass =
    "mb-1 block text-xs font-medium text-gray-600";

export function LoanDetailsForm({
    form,
    activeLoans,
    onSelectLoan,
    calculatedICOD,
    availableChangeAmount
}: LoanDetailsFormProps) {
    const {
        register,
        control,
        setValue,
    } = form;

    const transactionType = useWatch({
        control,
        name: "transactionType",
    });

    const selectedAccountNumber = useWatch({
        control,
        name: "accountNumber",
    });

    const applySupplementaryCharge = useWatch({
        control,
        name: "applySupplementaryCharge",
    });

    const selectedChangeAmount = useWatch({
        control,
        name: "changeAmount",
    }) ?? 0;

    const remainingChangeAmount = Math.max(
        0,
        availableChangeAmount - selectedChangeAmount
    );

    const config = TRANSACTION_FIELD_CONFIG[transactionType];

    function handleTransactionTypeChange(
        value: TransactionType
    ) {
        setValue("transactionType", value, {
            shouldDirty: true,
            shouldValidate: true,
        });

        // Reset fields belonging to the previous transaction.
        setValue("accountNumber", "");
        setValue("installment", 0);
        setValue("terms", 0);
        setValue("icodAmountToPay", null);
        setValue("supplementary", 0);
        setValue("supplementaryBalance", 0);
        setValue(
            "changeAmount",
            value === "CHANGE" ? availableChangeAmount : 0,
            {
                shouldDirty: true,
                shouldValidate: true,
            }
        );
        setValue("applySupplementaryCharge", false);
        setValue("selectedSupplementaryChargeIds", []);
        setValue("previousFeePayments", [], {
            shouldDirty: true,
            shouldValidate: true,
        });
    }

    function handleLoanChange(accountNumber: string) {
        if (!accountNumber) {
            setValue("accountNumber", "", {
                shouldDirty: true,
            });

            setValue("installment", 0);
            setValue("supplementaryBalance", 0);
            setValue("applySupplementaryCharge", false);
            setValue("selectedSupplementaryChargeIds", []);

            return;
        }

        const loan = activeLoans.find(
            (item) =>
                item.accountNumber === accountNumber
        );

        if (!loan) return;

        onSelectLoan(loan);
    }

    const selectedDeductionCodes =
        useWatch({
            control,
            name: "selectedDeductionCodes",
        }) ?? [];

    function toggleDeductionCode(code: DeductionCode) {
        const next = selectedDeductionCodes.includes(code)
            ? selectedDeductionCodes.filter(
                (item) => item !== code
            )
            : [...selectedDeductionCodes, code];

        setValue("selectedDeductionCodes", next, {
            shouldDirty: true,
            shouldValidate: true,
        });
    }

    const availableDeductionOptions =
        transactionType === "CHANGE"
            ? DEDUCTION_OPTIONS.filter(
                (option) => option.value === "PROC_FEE"
            )
            : DEDUCTION_OPTIONS;

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

            <div className="grid grid-cols-1 gap-x-4 gap-y-4 p-4 sm:grid-cols-2">

                <div className="sm:col-span-2">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Transaction Information
                    </h4>
                </div>
                {/* TRANSACTION DATE */}
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

                {/* TRANSACTION TYPE */}
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
                        {TRANSACTION_TYPE_OPTIONS.map(
                            (option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            )
                        )}
                    </select>
                </div>

                {/* EXISTING LOAN */}
                {config.requiresExistingLoan && (
                    <div className="sm:col-span-2">
                        <label className={labelClass}>
                            Existing Loan Account
                        </label>

                        <select
                            value={selectedAccountNumber}
                            onChange={(event) =>
                                handleLoanChange(
                                    event.target.value
                                )
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

                <div className="sm:col-span-2 border-t border-gray-100 pt-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Loan Configuration
                    </h4>
                </div>

                {/* INSTALLMENT */}
                {config.showInstallment && (
                    <div>
                        <label className={labelClass}>
                            Monthly Installment
                        </label>

                        <input
                            type="number"
                            min={0}
                            step="0.01"
                            readOnly={config.installmentReadOnly}
                            {...register("installment", {
                                valueAsNumber: true,
                            })}
                            className={`${inputClass} ${config.installmentReadOnly
                                ? "bg-gray-50 text-gray-500"
                                : ""
                                }`}
                        />
                    </div>
                )}

                {/* LOAN TERMS */}
                {config.showTerms && (
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
                )}

                {/* SUPPLEMENTARY */}
                {config.showSupplementary && (
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


                <div className="sm:col-span-2 border-t border-gray-100 pt-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Deductions and Charges
                    </h4>
                </div>

                <div className="sm:col-span-2">
                    <label className={labelClass}>
                        Deduction Fees
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                        {availableDeductionOptions.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center gap-2 text-black"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedDeductionCodes.includes(
                                        option.value
                                    )}
                                    onChange={() =>
                                        toggleDeductionCode(option.value)
                                    }
                                />

                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>


                {/* ICOD PAYMENT */}
                {transactionType !== "CHANGE" &&
                    calculatedICOD !== undefined &&
                    calculatedICOD > 0 &&
                    selectedDeductionCodes.includes("ICOD") && (
                        <div className="sm:col-span-2 rounded-md border border-gray-200 bg-gray-50 p-3">
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <p className="text-sm font-semibold text-gray-800">
                                    ICOD Payment
                                </p>

                                <span className="text-xs font-semibold text-gray-700">
                                    Required: ₱
                                    {calculatedICOD.toLocaleString("en-PH", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>

                            <label className={labelClass}>
                                ICOD Amount to Pay
                            </label>

                            <input
                                type="number"
                                min={0}
                                max={calculatedICOD}
                                step="0.01"
                                {...register("icodAmountToPay", {
                                    setValueAs: (value) =>
                                        value === "" ? null : Number(value),
                                })}
                                placeholder={`Full amount: ${calculatedICOD.toFixed(2)}`}
                                className={inputClass}
                            />

                            <p className="mt-1.5 text-xs text-gray-500">
                                Leave blank for full payment. Enter a lower
                                amount for partial payment.
                            </p>
                        </div>
                    )}

                {/* CHANGE AMOUNT */}
                {config.showChangeAmount && (
                    <div className="sm:col-span-2 space-y-4">

                        {/* AVAILABLE CHANGE */}
                        <div>
                            <label className={labelClass}>
                                Available CHANGE Balance
                            </label>

                            <input
                                type="number"
                                value={availableChangeAmount}
                                readOnly
                                className={`${inputClass} bg-gray-50 text-gray-500`}
                            />
                        </div>

                        {/* SELECTED CHANGE */}
                        <div>
                            <label className={labelClass}>
                                CHANGE Amount to Withdraw
                            </label>

                            <input
                                type="number"
                                min={0}
                                max={availableChangeAmount}
                                step="0.01"
                                {...register("changeAmount", {
                                    valueAsNumber: true,
                                    validate: (value) => {
                                        if (!Number.isFinite(value) || value <= 0) {
                                            return "Enter a CHANGE amount greater than zero.";
                                        }

                                        if (value > availableChangeAmount) {
                                            return "CHANGE amount exceeds available balance.";
                                        }

                                        return true;
                                    },
                                })}
                                className={inputClass}
                            />

                            {form.formState.errors.changeAmount && (
                                <p className="mt-1 text-xs text-red-600">
                                    {form.formState.errors.changeAmount.message}
                                </p>
                            )}
                        </div>

                        {/* REMAINING CHANGE */}
                        <div>
                            <label className={labelClass}>
                                Remaining CHANGE Balance
                            </label>

                            <input
                                type="number"
                                value={remainingChangeAmount}
                                readOnly
                                className={`${inputClass} bg-gray-50 text-gray-500`}
                            />
                        </div>

                    </div>
                )}

                {/* SUPPLEMENTARY CHARGE OPTION */}
                {config.showSupplementaryChargeOption && (
                    <div className="sm:col-span-2 rounded-md border border-gray-200 bg-gray-50 p-4">
                        <label className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    Pay Supplementary Charges
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    Select outstanding SL charges
                                    in Supplementary Details.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                {...register(
                                    "applySupplementaryCharge"
                                )}
                                className="h-4 w-4 accent-[#1F4B3F]"
                            />
                        </label>

                        {applySupplementaryCharge && (
                            <p className="mt-3 text-xs text-[#1F4B3F]">
                                Open Supplementary Details to
                                select the charge months to pay.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
