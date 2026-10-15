"use client";

import { useMemo, useState } from "react";
import {
    Search,
    UserRound,
    X,
    Check,
    LoaderCircle,
} from "lucide-react";

import { useDebounce } from "@/hooks/useDebounce";

import { pensionerFixtures } from "../../fixtures/pensionerFixtures";

import type { Pensioner } from "../../types/computationSlip.types";

type PensionerSearchProps = {
    value: Pensioner | null;
    onChange: (pensioner: Pensioner | null) => void;
    disabled?: boolean;
};

export function PensionerSearch({
    value,
    onChange,
    disabled = false,
}: PensionerSearchProps) {
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 500);

    const filteredPensioners = useMemo(() => {
        const query = debouncedSearch
            .trim()
            .toLowerCase();

        if (query.length < 2) {
            return [];
        }

        return pensionerFixtures
            .filter((pensioner) => {
                const fullName = [
                    pensioner.firstName,
                    pensioner.middleName,
                    pensioner.lastName,
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();

                const reverseName = [
                    pensioner.lastName,
                    pensioner.firstName,
                    pensioner.middleName,
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();

                return (
                    fullName.includes(query) ||
                    reverseName.includes(query) ||
                    pensioner.pensionerCode
                        .toLowerCase()
                        .includes(query)
                );
            })
            .slice(0, 10);
    }, [debouncedSearch]);

    const showResults =
        !value && search.trim().length >= 2;

    const isSearching =
        search.trim() !== debouncedSearch.trim();

    function handleSelect(pensioner: Pensioner) {
        onChange(pensioner);
        setSearch("");
    }

    function handleClear() {
        onChange(null);
        setSearch("");
    }

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1B2430]">
                Search Pensioner
            </label>

            {!value ? (
                <div className="relative">
                    <Search
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        disabled={disabled}
                        placeholder="Search name or pensioner code..."
                        className="h-11 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm text-[#1B2430] outline-none transition focus:border-[#1F4B3F] focus:ring-2 focus:ring-[#1F4B3F]/10 disabled:opacity-50"
                    />
                </div>
            ) : (
                <div className="flex items-center justify-between rounded-md border border-green-200 bg-green-50 px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                            <UserRound
                                size={19}
                                className="text-[#1F4B3F]"
                            />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-[#1B2430]">
                                {value.lastName},{" "}
                                {value.firstName}{" "}
                                {value.middleName ?? ""}
                            </p>

                            <p className="text-xs text-gray-500">
                                {value.pensionerCode}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Check
                            size={18}
                            className="text-green-600"
                        />

                        <button
                            type="button"
                            onClick={handleClear}
                            disabled={disabled}
                            aria-label="Clear pensioner"
                            className="rounded-md p-1 text-gray-500 transition hover:bg-green-100 disabled:opacity-50"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            )}

            {showResults && (
                <div className="max-h-64 overflow-y-auto rounded-md border border-gray-200 bg-white">
                    {isSearching ? (
                        <div className="flex items-center justify-center gap-2 px-4 py-5 text-sm text-gray-500">
                            <LoaderCircle
                                size={16}
                                className="animate-spin"
                            />
                            Searching pensioners...
                        </div>
                    ) : filteredPensioners.length === 0 ? (
                        <div className="px-4 py-5 text-center text-sm text-gray-500">
                            No pensioner found.
                        </div>
                    ) : (
                        filteredPensioners.map((pensioner) => (
                            <button
                                key={pensioner.id}
                                type="button"
                                onClick={() =>
                                    handleSelect(pensioner)
                                }
                                className="flex w-full items-center justify-between gap-4 border-b border-gray-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-gray-50"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {pensioner.lastName},{" "}
                                        {pensioner.firstName}{" "}
                                        {pensioner.middleName ?? ""}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {pensioner.pensionerCode}
                                    </p>
                                </div>

                                <span
                                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${pensioner.status === "Active"
                                        ? "bg-green-50 text-green-700"
                                        : pensioner.status === "Pending"
                                            ? "bg-amber-50 text-amber-700"
                                            : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {pensioner.status}
                                </span>
                            </button>
                        ))
                    )}
                </div>
            )}

            {!value && !showResults && (
                <p className="text-xs text-gray-500">
                    Enter at least 2 characters to search.
                </p>
            )}
        </div>
    );
}