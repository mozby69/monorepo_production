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
    pensioner: Pensioner;
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
        <div className="space-y-1.5">
            <p className="flex items-center gap-2 text-xs font-medium text-gray-500">
                <Icon size={14} />
                {label}
            </p>

            <div className="flex min-h-10 items-center rounded-md border border-gray-200 bg-gray-50 px-3 text-sm font-medium text-[#1B2430]">
                {value}
            </div>
        </div>
    );
}

export function PensionerInformation({
    pensioner,
}: PensionerInformationProps) {
    const fullName = [
        pensioner.lastName,
        pensioner.firstName,
        pensioner.middleName,
    ]
        .filter(Boolean)
        .join(", ");

    return (
        <section className="rounded-md border border-[#E2E4E1] bg-white p-5">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h3 className="font-serif text-lg font-semibold text-[#1B2430]">
                        Pensioner Information
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                        Personal and pension details
                    </p>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${pensioner.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : pensioner.status === "Pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {pensioner.status}
                </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <InformationField
                        label="Pensioner Name"
                        value={fullName}
                        icon={UserRound}
                    />
                </div>

                <InformationField
                    label="Pensioner Code"
                    value={pensioner.pensionerCode}
                    icon={Hash}
                />

                <InformationField
                    label="Bank"
                    value={pensioner.bankName}
                    icon={Landmark}
                />

                <InformationField
                    label="Birth Date"
                    value={new Date(
                        `${pensioner.birthDate}T00:00:00`
                    ).toLocaleDateString("en-PH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                    icon={CalendarDays}
                />

                <InformationField
                    label="Age"
                    value={`${calculateAge(pensioner.birthDate)} years old`}
                    icon={CalendarDays}
                />

                <div className="sm:col-span-2">
                    <InformationField
                        label="Actual Pension"
                        value={currencyFormatter.format(
                            pensioner.actualPension
                        )}
                        icon={Wallet}
                    />
                </div>
            </div>
        </section>
    );
}