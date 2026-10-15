"use client";

import { useMemo, useState } from "react";

import {
    Calculator,
    ChevronLeft,
    ChevronRight,
    Eye,
    MoreHorizontal,
    Pencil,
    Search,
    SlidersHorizontal,
} from "lucide-react";

import {
    mockComputationSlips,
    type ComputationSlip,
    type ComputationSlipStatus,
} from "@/modules/ssp/computationSlip/fixtures/computationSlipFixtures";

import { formatDate } from "@/utils/format-date";
import { DEFAULT_PAGE_SIZE, formatCurrency } from "@repo/shared";

type ComputationSlipTableProps = {
    onSelect?: (computationSlip: ComputationSlip) => void;
    onEdit?: (computationSlip: ComputationSlip) => void;
};

type StatusFilter = "All" | ComputationSlipStatus;

const headings = [
    "Pensioner ID",
    "Account #",
    "Transaction Date",
    "Loan Type",
    "Effectivity Date",
    "Installment",
    "LR Principal",
    "SL Principal",
    "Actions",
];

const statusStyles: Record<ComputationSlipStatus, string> = {
    Active: "bg-green-50 text-green-700",
    Pending: "bg-amber-50 text-amber-700",
    Inactive: "bg-gray-100 text-gray-600",
};

export default function CompSlipList({
    onSelect,
    onEdit,
}: ComputationSlipTableProps) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<StatusFilter>("All");
    const [page, setPage] = useState(1);
    const [openMenu, setOpenMenu] = useState<number | null>(null);

    const pageSize = DEFAULT_PAGE_SIZE || 10;

    // Filter computation slips
    const filteredComputationSlips = useMemo(() => {
        const query = search.trim().toLowerCase();

        return mockComputationSlips.filter((computation) => {
            const matchesSearch =
                computation.pensioner.firstName.toLowerCase().includes(query) ||
                computation.pensioner.lastName.toLowerCase().includes(query) ||
                computation.pensioner.pensionerCode.toLowerCase().includes(query) ||
                computation.accountNo.toLowerCase().includes(query);

            const matchesStatus =
                status === "All" ||
                computation.pensioner.status === status;

            return matchesSearch && matchesStatus;
        });
    }, [search, status]);

    // Pagination
    const totalPages = Math.max(
        1,
        Math.ceil(filteredComputationSlips.length / pageSize)
    );

    const currentPage = Math.min(page, totalPages);

    const paginatedComputationSlips = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize;

        return filteredComputationSlips.slice(
            startIndex,
            startIndex + pageSize
        );
    }, [filteredComputationSlips, currentPage, pageSize]);

    const handleSearch = (value: string) => {
        setSearch(value);
        setPage(1);
        setOpenMenu(null);
    };

    const handleStatus = (value: StatusFilter) => {
        setStatus(value);
        setPage(1);
        setOpenMenu(null);
    };

    const handleView = (computation: ComputationSlip) => {
        setOpenMenu(null);
        onSelect?.(computation);
    };

    const handleEdit = (computation: ComputationSlip) => {
        setOpenMenu(null);
        onEdit?.(computation);
    };

    const startItem =
        filteredComputationSlips.length === 0
            ? 0
            : (currentPage - 1) * pageSize + 1;

    const endItem = Math.min(
        currentPage * pageSize,
        filteredComputationSlips.length
    );

    return (
        <div className="overflow-hidden rounded-[15px] border border-[#E0E2DC] bg-white">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E9EBE6] px-5 py-5">
                <div>
                    <div className="flex items-center gap-2">
                        <Calculator size={17} className="text-[#64786A]" />

                        <h2 className="text-[14px] font-semibold text-[#26342F]">
                            Computation Slip List
                        </h2>

                        <span className="rounded-full bg-[#EDF0EA] px-2 py-0.5 text-[11px] font-medium text-[#65776A]">
                            {filteredComputationSlips.length}
                        </span>
                    </div>

                    <p className="mt-1 text-[11px] text-[#929A93]">
                        Recently created pension loan computations.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Search */}
                    <div className="relative">
                        <Search
                            size={15}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#929A93]"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                handleSearch(event.target.value)
                            }
                            placeholder="Search pensioners..."
                            className="h-9 w-55 rounded-[9px] border border-[#DCE0D9] bg-[#FAFBF9] pl-9 pr-3 text-[12px] text-[#26342F] outline-none transition focus:border-[#8BA194] focus:ring-2 focus:ring-[#DDE7DE]"
                        />
                    </div>

                    {/* Status filter */}
                    <div className="relative flex items-center">
                        <SlidersHorizontal
                            size={14}
                            className="pointer-events-none absolute left-3 text-[#87918B]"
                        />

                        <select
                            value={status}
                            onChange={(event) =>
                                handleStatus(event.target.value as StatusFilter)
                            }
                            className="h-9 cursor-pointer appearance-none rounded-[9px] border border-[#DCE0D9] bg-[#FAFBF9] py-0 pl-9 pr-8 text-[12px] text-[#526459] outline-none focus:border-[#8BA194]"
                        >
                            <option value="All">All statuses</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px] text-left">
                    <thead className="bg-[#FAFBF9]">
                        <tr className="border-b border-[#E9EBE6]">
                            {headings.map((heading) => (
                                <th
                                    key={heading}
                                    className="px-5 py-3.5 text-[10px] font-semibold uppercase tracking-wider text-[#929A93]"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedComputationSlips.map((computation) => {
                            const pensioner = computation.pensioner;

                            return (
                                <tr
                                    key={computation.id}
                                    className="border-b border-[#EEF0EB] transition-colors last:border-0 hover:bg-[#FAFBF9]"
                                >
                                    {/* Status and pensioner name */}
                                    {/* Pensioner ID */}
                                    <td className="px-5 py-4">
                                        <div className="flex flex-col gap-1">
                                            {/* <span
                                                className={`w-fit rounded-full px-2 py-1 text-[10px] font-medium ${statusStyles[pensioner.status]
                                                    }`}
                                            >
                                                {pensioner.status}
                                            </span> */}

                                            {/* <span>
                                                {pensioner.pensionerCode}
                                            </span> */}


                                            <span className="text-[12px] font-semibold text-[#26342F]">
                                                {pensioner.pensionerCode}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Account number */}
                                    <td className="px-5 py-4 text-[12px] text-[#87918B]">
                                        {computation.accountNo}
                                    </td>

                                    {/* Transaction date */}
                                    <td className="px-5 py-4 text-[12px] text-[#87918B]">
                                        {formatDate(computation.transactionDate)}
                                    </td>

                                    {/* Loan type */}
                                    <td className="px-5 py-4 text-[12px] text-[#87918B]">
                                        {computation.transactionType}
                                    </td>

                                    {/* Effectivity */}
                                    <td className="px-5 py-4 text-[12px] text-[#87918B]">
                                        {formatDate(computation.effectivityDate)}
                                    </td>

                                    {/* Installment */}
                                    <td className="px-5 py-4 text-[12px] font-semibold text-[#26342F]">
                                        {formatCurrency(computation.installment)}
                                    </td>

                                    {/* LR principal */}
                                    <td className="px-5 py-4 text-[12px] font-semibold text-[#26342F]">
                                        {formatCurrency(computation.principalAmount)}
                                    </td>

                                    {/* SL principal */}
                                    <td className="px-5 py-4 text-[12px] font-semibold text-[#26342F]">
                                        {formatCurrency(
                                            computation.supplementary?.principalAmount ?? 0
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-5 py-4">
                                        <div className="relative">
                                            <button
                                                type="button"
                                                aria-label={`Actions for ${computation.accountNo}`}
                                                aria-expanded={openMenu === computation.id}
                                                onClick={() =>
                                                    setOpenMenu((previous) =>
                                                        previous === computation.id
                                                            ? null
                                                            : computation.id
                                                    )
                                                }
                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#87918B] hover:bg-[#EDF0EA] hover:text-[#26342F]"
                                            >
                                                <MoreHorizontal size={18} />
                                            </button>

                                            {openMenu === computation.id && (
                                                <div className="absolute right-0 top-9 z-20 w-40 rounded-lg border border-[#E0E2DC] bg-white p-1 shadow-lg">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleView(computation)}
                                                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[12px] text-[#526459] hover:bg-[#F1F3EF]"
                                                    >
                                                        <Eye size={14} />
                                                        View details
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(computation)}
                                                        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-[12px] text-[#526459] hover:bg-[#F1F3EF]"
                                                    >
                                                        <Pencil size={14} />
                                                        Edit Comp Slip
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}

                        {/* Empty state */}
                        {paginatedComputationSlips.length === 0 && (
                            <tr>
                                <td
                                    colSpan={headings.length}
                                    className="px-5 py-16 text-center"
                                >
                                    <Calculator
                                        size={28}
                                        className="mx-auto mb-3 text-[#B1BAB1]"
                                    />

                                    <p className="text-[13px] font-medium text-[#526459]">
                                        No computation slip found
                                    </p>

                                    <p className="mt-1 text-[12px] text-[#929A93]">
                                        Try adjusting your search or filters.
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E9EBE6] px-5 py-4">
                <p className="text-[11px] text-[#929A93]">
                    Showing{" "}
                    <span className="font-medium text-[#526459]">
                        {startItem} - {endItem}
                    </span>{" "}
                    of {filteredComputationSlips.length} computation slips
                </p>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => {
                            setPage(currentPage - 1);
                            setOpenMenu(null);
                        }}
                        className="flex h-8 items-center gap-1 rounded-lg border border-[#E0E2DC] px-3 text-[11px] text-[#526459] hover:bg-[#F5F7F3] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <ChevronLeft size={14} />
                        Previous
                    </button>

                    <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-[#26342F] px-2 text-[11px] font-medium text-white">
                        {currentPage} / {totalPages}
                    </span>

                    <button
                        type="button"
                        disabled={currentPage >= totalPages}
                        onClick={() => {
                            setPage(currentPage + 1);
                            setOpenMenu(null);
                        }}
                        className="flex h-8 items-center gap-1 rounded-lg border border-[#E0E2DC] px-3 text-[11px] text-[#526459] hover:bg-[#F5F7F3] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Next
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}