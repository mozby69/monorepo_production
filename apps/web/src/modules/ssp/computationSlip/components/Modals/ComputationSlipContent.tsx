"use client";

import { PensionerSearch } from "../Contents/PensionerSearch";
import { PensionerInformation } from "../Contents/PensionerInformation";
import { ActiveLoanList } from "../Contents/ActiveLoanList";
import { LoanDetailsForm } from "../Contents/LoanDetailsForm";
import { ComputationSummary } from "../Contents/ComputationSummary";

import { useState } from "react";

import {
    ComputationDetails,
    type ComputationDetailTab,
} from "../Contents/details/ComputationDetails";

import {
    useComputationSlip,
} from "../../hooks/useComputationSlip";

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
    } = useComputationSlip();

    const [detailsOpen, setDetailsOpen] = useState(false);

    const [detailsTab, setDetailsTab] =
        useState<ComputationDetailTab>("fees");

    function openDetails(tab: ComputationDetailTab) {
        setDetailsTab(tab);
        setDetailsOpen(true);
    }

    return (
        <div className="space-y-6 py-2">
            <header>
                <h1 className="text-2xl font-semibold text-gray-900">
                    Computation Slip
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Prepare and review pension loan computations.
                </p>
            </header>

            <div className="rounded-lg border bg-white p-5">
                <PensionerSearch
                    value={selectedPensioner}
                    onChange={selectPensioner}
                />
            </div>

            {selectedPensioner && (
                <>
                    <PensionerInformation
                        pensioner={selectedPensioner}
                    />

                    <ActiveLoanList
                        loans={activeLoans}
                        selectedAccountNumber={
                            selectedLoan?.accountNumber
                        }
                        onSelect={selectLoan}
                    />

                    <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
                        <LoanDetailsForm
                            form={form}
                            activeLoans={activeLoans}
                            onSelectLoan={selectLoan}
                        />

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
                        </div>

                        {result && (
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => openDetails("fees")}
                                    className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                >
                                    View Fee Breakdown
                                </button>

                                <button
                                    type="button"
                                    onClick={() => openDetails("schedule")}
                                    className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                >
                                    View Loan Schedule
                                </button>

                                <button
                                    type="button"
                                    onClick={() => openDetails("supplementary")}
                                    className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                >
                                    Supplementary Details
                                </button>

                                <button
                                    type="button"
                                    onClick={() => openDetails("existing-loan")}
                                    className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                                >
                                    Existing Loan
                                </button>
                            </div>
                        )}

                        <ComputationDetails
                            open={detailsOpen}
                            onClose={() => setDetailsOpen(false)}
                            result={result}
                            activeLoan={selectedLoan}
                            initialTab={detailsTab}
                        />
                    </div>
                </>
            )}
        </div>
    );
}