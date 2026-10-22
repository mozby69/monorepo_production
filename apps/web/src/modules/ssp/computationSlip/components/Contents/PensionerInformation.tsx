import {
    UserRound,
    Landmark,
    CalendarDays,
    Wallet,
    Hash,
} from "lucide-react";

import type {
    Pensioner,
} from "../../types/computationSlip.types";

type PensionerInformationProps = {
    pensioner: Pensioner | null;
};

const currencyFormatter = new Intl.NumberFormat(
    "en-PH",
    {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
    }
);

function calculateAge(birthDate: string): number {
    const today = new Date();

    const birth = new Date(
        `${birthDate}T00:00:00`
    );

    let age =
        today.getFullYear() - birth.getFullYear();

    const monthDifference =
        today.getMonth() - birth.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < birth.getDate()
        )
    ) {
        age--;
    }

    return age;
}

function InformationField({
    label,
    value,
    icon: Icon,
}: {
    label: string;
    value: string;
    icon: typeof UserRound;
}) {
    return (
        <div className="min-w-0 space-y-1">
            <p className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <Icon size={13} />
                {label}
            </p>

            <p className="break-words text-sm font-medium text-[#1B2430]">
                {value}
            </p>
        </div>
    );
}

export function PensionerInformation({
    pensioner,
}: PensionerInformationProps) {
    const fullName = [
        pensioner?.lastName,
        pensioner?.firstName,
        pensioner?.middleName,
    ]
        .filter(Boolean)
        .join(", ");

    return (
        <section className="rounded-md border border-[#E2E4E1] bg-white p-4">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h3 className="font-serif text-sm font-semibold text-[#1B2430]">
                        Pensioner Information
                    </h3>

                    <p className="mt-2 break-words text-base font-semibold text-[#1B2430]">
                        {fullName}
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                        <Hash size={13} />
                        Pensioner Code: {pensioner?.pensionerCode || ""}
                    </p>
                </div>

                <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${pensioner?.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : pensioner?.status === "Pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {pensioner?.status ?? ""}
                </span>
            </div>

            {/* Personal and pension details */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-gray-100 pt-3 lg:grid-cols-4">
                <InformationField
                    label="Bank"
                    value={`${pensioner ? pensioner?.bankName || "" : '----'}`}
                    icon={Landmark}
                />

                <InformationField
                    label="Birth Date"
                    value={
                        pensioner
                            ? new Date(
                                `${pensioner.birthDate}T00:00:00`
                            ).toLocaleDateString("en-PH", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })
                            : "--- --, ----"
                    }
                    icon={CalendarDays}
                />

                <InformationField
                    label="Age"
                    value={`${pensioner
                        ? calculateAge(pensioner.birthDate) + ` years old`
                        : "-- ----- ---"
                        }`}
                    icon={CalendarDays}
                />

                <InformationField
                    label="Actual Pension"
                    value={
                        pensioner
                            ? currencyFormatter.format(
                                pensioner.actualPension
                            )
                            : "0.00"
                    }
                    icon={Wallet}
                />
            </div>
        </section>
    );
}