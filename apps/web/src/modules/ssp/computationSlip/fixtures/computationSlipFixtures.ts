export type ComputationSlipStatus =
    | "Active"
    | "Inactive"
    | "Pending";

export type Pensioner = {
    id: number;
    firstName: string;
    lastName: string;
    pensionerCode: string;
    status: ComputationSlipStatus;
}

export type ComputationSlip = {
    id: number;
    pensioner: Pensioner;
    accountNo: string;
    transactionDate: string;
    transactionType: string;
    effectivityDate: string;
    installment: number;
    principalAmount: number;
    supplementary: {
        principalAmount: number;
    } | null;
};


export const mockPensionerList: Pensioner[] = [
    {
        id: 1,
        firstName: "Juan",
        lastName: "Dela Cruz",
        pensionerCode: "PEN-0001",
        status: "Active",
    },
    {
        id: 2,
        firstName: "Maria",
        lastName: "Santos",
        pensionerCode: "PEN-0002",
        status: "Pending",
    },
    {
        id: 3,
        firstName: "Pedro",
        lastName: "Reyes",
        pensionerCode: "PEN-0003",
        status: "Active",
    },
    {
        id: 4,
        firstName: "Ana",
        lastName: "Garcia",
        pensionerCode: "PEN-0004",
        status: "Inactive",
    },
    {
        id: 5,
        firstName: "Jose",
        lastName: "Mendoza",
        pensionerCode: "PEN-0005",
        status: "Active",
    },
    ...Array.from({ length: 15 }, (_, index) => ({
        id: index + 6,
        firstName: `Sample ${index + 6}`,
        lastName: "Pensioner",
        pensionerCode: `PEN-${String(index + 6).padStart(4, "0")}`,
        status: (["Active", "Inactive", "Pending"] as const)[index % 3],
    })),
];

export const mockComputationSlips: ComputationSlip[] = [
    {
        id: 1,
        pensioner: mockPensionerList[0],
        accountNo: "ACC-2026-001",
        transactionDate: "2026-10-01",
        transactionType: "New",
        effectivityDate: "2026-11-01",
        installment: 5000,
        principalAmount: 120000,
        supplementary: { principalAmount: 15000 },
    },
    {
        id: 2,
        pensioner: mockPensionerList[1],
        accountNo: "ACC-2026-002",
        transactionDate: "2026-10-02",
        transactionType: "Closed Renew",
        effectivityDate: "2026-11-02",
        installment: 4200,
        principalAmount: 100000,
        supplementary: { principalAmount: 0 },
    },
    {
        id: 3,
        pensioner: mockPensionerList[2],
        accountNo: "ACC-2026-003",
        transactionDate: "2026-10-03",
        transactionType: "Transfer",
        effectivityDate: "2026-11-03",
        installment: 6500,
        principalAmount: 180000,
        supplementary: { principalAmount: 20000 },
    },
    {
        id: 4,
        pensioner: mockPensionerList[3],
        accountNo: "ACC-2026-004",
        transactionDate: "2026-10-04",
        transactionType: "Additional",
        effectivityDate: "2026-11-04",
        installment: 3500,
        principalAmount: 85000,
        supplementary: null,
    },
    {
        id: 5,
        pensioner: mockPensionerList[4],
        accountNo: "ACC-2026-005",
        transactionDate: "2026-10-05",
        transactionType: "New",
        effectivityDate: "2026-11-05",
        installment: 7200,
        principalAmount: 200000,
        supplementary: { principalAmount: 30000 },
    },
    ...Array.from({ length: 15 }, (_, index) => ({
        id: index + 6,
        pensioner: {
            id: index + 6,
            firstName: `Sample ${index + 6}`,
            lastName: "Pensioner",
            pensionerCode: `PEN-${String(index + 6).padStart(4, "0")}`,
            status: (["Active", "Inactive", "Pending"] as const)[index % 3],
        },
        accountNo: `ACC-2026-${String(index + 6).padStart(3, "0")}`,
        transactionDate: "2026-10-06",
        transactionType: "New",
        effectivityDate: "2026-11-06",
        installment: 4500,
        principalAmount: 110000,
        supplementary: { principalAmount: 10000 },
    })),
];