"use client";

import { useEffect, useState } from "react";
import {
    X,
    ReceiptText,
    CalendarDays,
    Wallet,
    History,
} from "lucide-react";

import { FeeBreakdown } from "./FeeBreakdown";
import { LoanSchedules } from "./LoanSchedules";
import { SupplementaryDetails } from "./SupplementaryDetails";
import { ExistingLoanDetails } from "./ExistingLoanDetails";

import type {
    ActiveLoan,
} from "../../../types/computationSlip.types";

import type {
    ComputationManagerResult,
} from "../../../services/computation.manager";


export type ComputationDetailTab =
    | "fees"
    | "schedule"
    | "supplementary"
    | "existing-loan";

type ComputationDetailsProps = {
    open: boolean;
    onClose: () => void;
    result: ComputationManagerResult | null;
    activeLoan: ActiveLoan | null;
    initialTab?: ComputationDetailTab;
};

const tabs = [
    {
        id: "fees",
        label: "Fee Breakdown",
        icon: ReceiptText,
    },
    {
        id: "schedule",
        label: "Loan Schedule",
        icon: CalendarDays,
    },
    {
        id: "supplementary",
        label: "Supplementary",
        icon: Wallet,
    },
    {
        id: "existing-loan",
        label: "Existing Loan",
        icon: History,
    },
] as const;

export function ComputationDetails({
    open,
    onClose,
    result,
    activeLoan,
    initialTab = "fees",
}: ComputationDetailsProps) {
    const [activeTab, setActiveTab] =
        useState<ComputationDetailTab>(initialTab);

    useEffect(() => {
        if (open) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveTab(initialTab);
        }
    }, [open, initialTab]);

    useEffect(() => {
        if (!open) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [open, onClose]);

    if (!open || !result) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50">
            <button
                type="button"
                aria-label="Close computation details"
                className="absolute inset-0 bg-slate-950/40"
                onClick={onClose}
            />

            <aside
                role="dialog"
                aria-modal="true"
                aria-labelledby="computation-details-title"
                className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col bg-slate-50 shadow-2xl"
            >
                <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
                    <div>
                        <h2
                            id="computation-details-title"
                            className="text-lg font-semibold text-slate-900"
                        >
                            Computation Details
                        </h2>

                        <p className="text-sm text-slate-500">
                            Detailed loan calculation breakdown
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    >
                        <X size={20} />
                    </button>
                </header>

                <nav
                    aria-label="Computation detail sections"
                    className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-4 py-3"
                >
                    {tabs.map((tab) => {
                        const Icon = tab.icon;

                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() =>
                                    setActiveTab(tab.id)
                                }
                                aria-current={
                                    activeTab === tab.id
                                        ? "page"
                                        : undefined
                                }
                                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${activeTab === tab.id
                                    ? "bg-slate-900 text-white"
                                    : "text-slate-600 hover:bg-slate-100"
                                    }`}
                            >
                                <Icon size={16} />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === "fees" && (
                        <FeeBreakdown result={result} />
                    )}

                    {activeTab === "schedule" && (
                        <LoanSchedules schedules={result.schedules} />
                    )}

                    {activeTab === "supplementary" && (
                        <SupplementaryDetails result={result} />
                    )}

                    {activeTab === "existing-loan" && (
                        <ExistingLoanDetails
                            loan={activeLoan}
                            result={result}
                        />
                    )}
                </div>
            </aside>
        </div>
    );
}