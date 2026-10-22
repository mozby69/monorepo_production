
"use client";

import { useState } from "react";

import { PensionerSearch } from "../Contents/PensionerSearch";
import { PensionerInformation } from "../Contents/PensionerInformation";
import { ActiveLoanList } from "../Contents/ActiveLoanList";
import { LoanDetailsForm } from "../Contents/LoanDetailsForm";
import { ComputationSummary } from "../Contents/ComputationSummary";

import { ComputationDetails, type ComputationDetailTab } from "../Contents/details/ComputationDetails";

import { useComputationSlip } from "../../hooks/useComputationSlip";
import { PreviousOutstandingFees } from "../Contents/details/PreviousOutstandingFees";

export default function ComputationSlipContent() {
    const {
        form,
        selectedPensioner,
        selectedLoan,
        activeLoans,
        selectPensioner,
        selectLoan,
        result,
        calculationError,
        selectedSupplementaryChargeIds,
        previousOutstandingFees,
        availableChangeAmount,
    } = useComputationSlip();

    const [detailsOpen, setDetailsOpen] = useState(false);

    const [detailsTab, setDetailsTab] = useState<ComputationDetailTab>("fees");

    // Read selected supplementary charges from the form.

    const applySupplementaryCharge =
        form.watch("applySupplementaryCharge");

    function openDetails(tab: ComputationDetailTab) {
        setDetailsTab(tab);
        setDetailsOpen(true);
    }

    function handleSelectedChargeIdsChange(ids: string[]) {
        form.setValue(
            "selectedSupplementaryChargeIds",
            ids,
            {
                shouldDirty: true,
                shouldValidate: true,
            }
        );

        if (ids.length > 0) {
            form.setValue(
                "applySupplementaryCharge",
                true,
                {
                    shouldDirty: true,
                    shouldValidate: true,
                }
            );
        }
    }

    const previousFeePayments =
        form.watch("previousFeePayments") ?? [];

    return (
        <div className="space-y-2">

            <div className="rounded-lg border bg-white py-5">
                <PensionerSearch
                    value={selectedPensioner}
                    onChange={selectPensioner}
                />
            </div>

            {/* {selectedPensioner && (
                <> */}
            <PensionerInformation
                pensioner={selectedPensioner || null}
            />

            <ActiveLoanList
                loans={activeLoans}
                selectedAccountNumber={
                    selectedLoan?.accountNumber
                }
                onSelect={selectLoan}
            />

            <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
                {/* LEFT COLUMN */}
                <div className="space-y-6">
                    <LoanDetailsForm
                        form={form}
                        activeLoans={activeLoans}
                        onSelectLoan={selectLoan}
                        calculatedICOD={result?.icod}
                        availableChangeAmount={availableChangeAmount}
                    />

                    <PreviousOutstandingFees
                        fees={previousOutstandingFees}
                        payments={previousFeePayments}
                        onChange={(payments) =>
                            form.setValue("previousFeePayments", payments, {
                                shouldDirty: true,
                                shouldValidate: true,
                            })
                        }
                    />
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-4">
                    {calculationError && (
                        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                            {calculationError}
                        </div>
                    )}

                    <ComputationSummary
                        result={result}
                        isComplete={result !== null}
                    />

                    {result && result.totalCashOut < 0 && (
                        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
                            Available cash-out is negative.
                            Review and adjust the loan details.
                        </div>
                    )}

                    {/* Detail buttons */}
                    {result && (
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    openDetails("fees")
                                }
                                className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                View Fee Breakdown
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    openDetails("schedule")
                                }
                                className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                View Loan Schedule
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    openDetails("supplementary")
                                }
                                className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Supplementary Details
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    openDetails("existing-loan")
                                }
                                className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Existing Loan
                            </button>
                        </div>
                    )}

                    {applySupplementaryCharge && !result && (
                        <p className="text-sm text-amber-700">
                            Supplementary charges will be available
                            once the computation is valid.
                        </p>
                    )}

                </div>
            </div>

            {/* Keep the drawer outside the grid */}
            <ComputationDetails
                open={detailsOpen}
                onClose={() => setDetailsOpen(false)}
                result={result}
                activeLoan={selectedLoan}
                initialTab={detailsTab}
                selectedChargeIds={selectedSupplementaryChargeIds}
                onSelectedChargeIdsChange={handleSelectedChargeIdsChange}
                previousOutstandingFees={previousOutstandingFees}
            />
            {/* </>
            )} */}
        </div>
    );
}
