
import type {
    PensionerStatus,
    TransactionType,
} from "../types/computationSlip.types";

// =====================================================
// TYPES FOR COMPUTATION SLIP LIST
// =====================================================

export interface MockPensionerListItem {
    id: number;
    firstName: string;
    lastName: string;
    pensionerCode: string;
    status: PensionerStatus;
}

export interface ComputationSlipListItem {
    id: number;
    pensioner: MockPensionerListItem;
    accountNo: string;
    transactionDate: string;
    transactionType: TransactionType;
    effectivityDate: string;
    installment: number;
    principalAmount: number;
    supplementary: {
        principalAmount: number;
    } | null;
}

// =====================================================
// MOCK PENSIONER LIST
// =====================================================

export const mockPensionerList: MockPensionerListItem[] = [
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
    {
        id: 6,
        firstName: "Roberto",
        lastName: "Villanueva",
        pensionerCode: "PEN-0006",
        status: "Active",
    },
    {
        id: 7,
        firstName: "Elena",
        lastName: "Ramos",
        pensionerCode: "PEN-0007",
        status: "Active",
    },
    {
        id: 8,
        firstName: "Antonio",
        lastName: "Flores",
        pensionerCode: "PEN-0008",
        status: "Pending",
    },
    {
        id: 9,
        firstName: "Carmen",
        lastName: "Bautista",
        pensionerCode: "PEN-0009",
        status: "Active",
    },
    {
        id: 10,
        firstName: "Ricardo",
        lastName: "Navarro",
        pensionerCode: "PEN-0010",
        status: "Inactive",
    },
    {
        id: 11,
        firstName: "Teresa",
        lastName: "Aquino",
        pensionerCode: "PEN-0011",
        status: "Active",
    },
    {
        id: 12,
        firstName: "Fernando",
        lastName: "Castillo",
        pensionerCode: "PEN-0012",
        status: "Active",
    },
    {
        id: 13,
        firstName: "Lourdes",
        lastName: "Mercado",
        pensionerCode: "PEN-0013",
        status: "Pending",
    },
    {
        id: 14,
        firstName: "Eduardo",
        lastName: "Cruz",
        pensionerCode: "PEN-0014",
        status: "Active",
    },
    {
        id: 15,
        firstName: "Gloria",
        lastName: "Fernandez",
        pensionerCode: "PEN-0015",
        status: "Active",
    },
    {
        id: 16,
        firstName: "Ramon",
        lastName: "Torres",
        pensionerCode: "PEN-0016",
        status: "Inactive",
    },
    {
        id: 17,
        firstName: "Rosario",
        lastName: "Lim",
        pensionerCode: "PEN-0017",
        status: "Active",
    },
    {
        id: 18,
        firstName: "Alfredo",
        lastName: "Gonzales",
        pensionerCode: "PEN-0018",
        status: "Pending",
    },
    {
        id: 19,
        firstName: "Nora",
        lastName: "Salazar",
        pensionerCode: "PEN-0019",
        status: "Active",
    },
    {
        id: 20,
        firstName: "Benjamin",
        lastName: "Lopez",
        pensionerCode: "PEN-0020",
        status: "Active",
    },
];

// =====================================================
// MOCK COMPUTATION SLIPS
// =====================================================

export const mockComputationSlips: ComputationSlipListItem[] = [
    // ORIGINAL FIVE RECORDS - VALUES PRESERVED
    {
        id: 1,
        pensioner: mockPensionerList[0],
        accountNo: "ACC-2026-001",
        transactionDate: "2026-10-01",
        transactionType: "NEW",
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
        transactionType: "RENEW",
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
        transactionType: "TRANSFER",
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
        transactionType: "ADDITIONAL",
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
        transactionType: "NEW",
        effectivityDate: "2026-11-05",
        installment: 7200,
        principalAmount: 200000,
        supplementary: { principalAmount: 30000 },
    },

    // ADDITIONAL DISTINCT TEST SCENARIOS
    {
        id: 6,
        pensioner: mockPensionerList[5],
        accountNo: "ACC-2026-006",
        transactionDate: "2026-01-12",
        transactionType: "RENEW",
        effectivityDate: "2026-03-01",
        installment: 5500,
        principalAmount: 135000,
        supplementary: { principalAmount: 12000 },
    },
    {
        id: 7,
        pensioner: mockPensionerList[6],
        accountNo: "ACC-2026-007",
        transactionDate: "2026-02-14",
        transactionType: "CHANGE",
        effectivityDate: "2026-03-01",
        installment: 0,
        principalAmount: 0,
        supplementary: null,
    },
    {
        id: 8,
        pensioner: mockPensionerList[7],
        accountNo: "ACC-2026-008",
        transactionDate: "2026-03-05",
        transactionType: "ADVANCE",
        effectivityDate: "2026-04-01",
        installment: 3000,
        principalAmount: 30000,
        supplementary: null,
    },
    {
        id: 9,
        pensioner: mockPensionerList[8],
        accountNo: "ACC-2026-009",
        transactionDate: "2026-03-18",
        transactionType: "RETURNEE",
        effectivityDate: "2026-05-01",
        installment: 4000,
        principalAmount: 96000,
        supplementary: { principalAmount: 8000 },
    },
    {
        id: 10,
        pensioner: mockPensionerList[9],
        accountNo: "ACC-2026-010",
        transactionDate: "2026-04-09",
        transactionType: "NEW",
        effectivityDate: "2026-05-01",
        installment: 2500,
        principalAmount: 60000,
        supplementary: null,
    },
    {
        id: 11,
        pensioner: mockPensionerList[10],
        accountNo: "ACC-2026-011",
        transactionDate: "2026-04-22",
        transactionType: "RENEW",
        effectivityDate: "2026-06-01",
        installment: 8000,
        principalAmount: 240000,
        supplementary: { principalAmount: 45000 },
    },
    {
        id: 12,
        pensioner: mockPensionerList[11],
        accountNo: "ACC-2026-012",
        transactionDate: "2026-05-11",
        transactionType: "TRANSFER",
        effectivityDate: "2026-06-01",
        installment: 6000,
        principalAmount: 150000,
        supplementary: null,
    },
    {
        id: 13,
        pensioner: mockPensionerList[12],
        accountNo: "ACC-2026-013",
        transactionDate: "2026-05-27",
        transactionType: "ADDITIONAL",
        effectivityDate: "2026-07-01",
        installment: 4800,
        principalAmount: 115000,
        supplementary: { principalAmount: 5000 },
    },
    {
        id: 14,
        pensioner: mockPensionerList[13],
        accountNo: "ACC-2026-014",
        transactionDate: "2026-06-03",
        transactionType: "NEW",
        effectivityDate: "2026-07-01",
        installment: 9500,
        principalAmount: 285000,
        supplementary: { principalAmount: 50000 },
    },
    {
        id: 15,
        pensioner: mockPensionerList[14],
        accountNo: "ACC-2026-015",
        transactionDate: "2026-06-19",
        transactionType: "RENEW",
        effectivityDate: "2026-08-01",
        installment: 3700,
        principalAmount: 89000,
        supplementary: { principalAmount: 0 },
    },
    {
        id: 16,
        pensioner: mockPensionerList[15],
        accountNo: "ACC-2026-016",
        transactionDate: "2026-07-08",
        transactionType: "CHANGE",
        effectivityDate: "2026-08-01",
        installment: 0,
        principalAmount: 0,
        supplementary: null,
    },
    {
        id: 17,
        pensioner: mockPensionerList[16],
        accountNo: "ACC-2026-017",
        transactionDate: "2026-07-24",
        transactionType: "RETURNEE",
        effectivityDate: "2026-09-01",
        installment: 5200,
        principalAmount: 125000,
        supplementary: { principalAmount: 18000 },
    },
    {
        id: 18,
        pensioner: mockPensionerList[17],
        accountNo: "ACC-2026-018",
        transactionDate: "2026-08-13",
        transactionType: "ADVANCE",
        effectivityDate: "2026-09-01",
        installment: 2000,
        principalAmount: 18000,
        supplementary: null,
    },
    {
        id: 19,
        pensioner: mockPensionerList[18],
        accountNo: "ACC-2026-019",
        transactionDate: "2026-09-04",
        transactionType: "ADDITIONAL",
        effectivityDate: "2026-10-01",
        installment: 6800,
        principalAmount: 165000,
        supplementary: { principalAmount: 22000 },
    },
    {
        id: 20,
        pensioner: mockPensionerList[19],
        accountNo: "ACC-2026-020",
        transactionDate: "2026-09-21",
        transactionType: "NEW",
        effectivityDate: "2026-11-01",
        installment: 10500,
        principalAmount: 315000,
        supplementary: { principalAmount: 60000 },
    },
];
