"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";

import type {
    ComputationScheduleResult,
} from "../../../services/computationSchedule.manager";

type ScheduleTab =
    | "loan"
    | "supplementary"
    | "udi";

type LoanSchedulesProps = {
    schedules: ComputationScheduleResult;
};

const tabs: {
    id: ScheduleTab;
    label: string;
}[] = [
        { id: "loan", label: "Loan Schedule" },
        { id: "supplementary", label: "Supplementary" },
        { id: "udi", label: "UDI Rebate" },
    ];

function formatLabel(key: string) {
    return key
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatValue(value: unknown): string {
    if (value === null || value === undefined) {
        return "—";
    }

    if (value instanceof Date) {
        return value.toLocaleDateString("en-PH");
    }

    if (typeof value === "number") {
        return value.toLocaleString("en-PH", {
            maximumFractionDigits: 2,
        });
    }

    if (typeof value === "boolean") {
        return value ? "Yes" : "No";
    }

    if (typeof value === "object") {
        return JSON.stringify(value);
    }

    return String(value);
}

function ScheduleTable({
    rows,
}: {
    rows: Record<string, unknown>[];
}) {
    if (rows.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 text-center">
                <CalendarDays
                    size={28}
                    className="text-slate-300"
                />

                <p className="mt-3 text-sm font-medium text-slate-700">
                    No schedule available
                </p>

                <p className="mt-1 text-xs text-slate-500">
                    Complete the required loan details
                    to generate this schedule.
                </p>
            </div>
        );
    }

    const columns = Array.from(
        new Set(rows.flatMap((row) => Object.keys(row)))
    );

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-max text-sm">
                <thead className="bg-slate-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column}
                                className="whitespace-nowrap border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600"
                            >
                                {formatLabel(column)}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                    {rows.map((row, index) => (
                        <tr
                            key={index}
                            className="hover:bg-slate-50"
                        >
                            {columns.map((column) => (
                                <td
                                    key={column}
                                    className="whitespace-nowrap px-4 py-3 text-slate-700"
                                >
                                    {formatValue(row[column])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function LoanSchedules({
    schedules,
}: LoanSchedulesProps) {
    const [activeTab, setActiveTab] =
        useState<ScheduleTab>("loan");

    const rows =
        activeTab === "loan"
            ? schedules.loanSchedule
            : activeTab === "supplementary"
                ? schedules.slSchedule
                : schedules.udiSchedule;

    return (
        <div className="space-y-5">
            <div>
                <h3 className="text-lg font-semibold text-slate-900">
                    Computation Schedules
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Review loan, supplementary, and UDI
                    rebate schedules.
                </p>
            </div>

            <div className="flex gap-2 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() =>
                            setActiveTab(tab.id)
                        }
                        className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.id
                            ? "bg-slate-900 text-white"
                            : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <ScheduleTable
                    rows={rows as Record<string, unknown>[]}
                />
            </div>

            <div className="flex justify-between text-xs text-slate-500">
                <span>
                    Total Records: {rows.length}
                </span>

                {activeTab === "supplementary" && (
                    <span>
                        Total Supplementary Charge:{" "}
                        {schedules.totalSupplementaryCharge.toLocaleString(
                            "en-PH",
                            {
                                style: "currency",
                                currency: "PHP",
                            }
                        )}
                    </span>
                )}
            </div>
        </div>
    );
}