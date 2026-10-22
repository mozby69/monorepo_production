
import type {
    PensionLoanInfo,
} from "../types/ssp-domain.types";

// =====================================================
// PENSION LOAN INFORMATION FIXTURES
// Source: pen_loan_info
// =====================================================

export const pensionLoanInfoFixtures: PensionLoanInfo[] = [
    // 1. JUAN DELA CRUZ - ORIGINAL RECORD
    {
        id: 1,
        clientId: 1,
        agentId: 1,
        pensionAmount: 15000,
        monthlyInstallment: 5000,
        changeAmount: 10000,
        availableChangeAmount: 10000,
        withdrawAll: false,
        collectionDay: 15,
        pensionType: "SSS",
        branchId: 1,
        createdAt: "2026-01-01T00:00:00Z",
        updatedAt: "2026-01-01T00:00:00Z",
    },

    // 2. MARIA SANTOS - PENDING CLIENT
    {
        id: 2,
        clientId: 2,
        agentId: 1,
        pensionAmount: 12500,
        monthlyInstallment: 4200,
        availableChangeAmount: 0,
        changeAmount: 8300,
        withdrawAll: false,
        collectionDay: 10,
        pensionType: "SSS",
        branchId: 1,
        createdAt: "2026-01-02T00:00:00Z",
        updatedAt: "2026-01-02T00:00:00Z",
    },

    // 3. PEDRO REYES - TRANSFER / PARTIAL PAYMENT
    {
        id: 3,
        clientId: 3,
        agentId: 2,
        pensionAmount: 18000,
        monthlyInstallment: 6500,
        availableChangeAmount: 0,
        changeAmount: 11500,
        withdrawAll: false,
        collectionDay: 5,
        pensionType: "GSIS",
        branchId: 1,
        createdAt: "2026-01-03T00:00:00Z",
        updatedAt: "2026-01-03T00:00:00Z",
    },

    // 4. ANA GARCIA - INACTIVE CLIENT
    {
        id: 4,
        clientId: 4,
        agentId: 2,
        pensionAmount: 10000,
        monthlyInstallment: 3500,
        availableChangeAmount: 0,
        changeAmount: 6500,
        withdrawAll: false,
        collectionDay: 10,
        pensionType: "SSS",
        branchId: 2,
        createdAt: "2026-01-04T00:00:00Z",
        updatedAt: "2026-01-04T00:00:00Z",
    },

    // 5. JOSE MENDOZA - HIGHER INSTALLMENT
    {
        id: 5,
        clientId: 5,
        agentId: 3,
        pensionAmount: 22000,
        monthlyInstallment: 7200,
        availableChangeAmount: 0,
        changeAmount: 14800,
        withdrawAll: false,
        collectionDay: 12,
        pensionType: "GSIS",
        branchId: 2,
        createdAt: "2026-01-05T00:00:00Z",
        updatedAt: "2026-01-05T00:00:00Z",
    },

    // 6. ROBERTO VILLANUEVA - RENEWAL / PRE-EFFECTIVITY
    {
        id: 6,
        clientId: 6,
        agentId: 1,
        pensionAmount: 16000,
        monthlyInstallment: 5500,
        availableChangeAmount: 0,
        changeAmount: 10500,
        withdrawAll: false,
        collectionDay: 15,
        pensionType: "SSS",
        branchId: 1,
        createdAt: "2026-01-06T00:00:00Z",
        updatedAt: "2026-01-06T00:00:00Z",
    },

    // 7. ELENA RAMOS - STANDARD COLLECTION
    {
        id: 7,
        clientId: 7,
        agentId: 1,
        pensionAmount: 12000,
        monthlyInstallment: 4000,
        availableChangeAmount: 0,
        changeAmount: 8000,
        withdrawAll: false,
        collectionDay: 12,
        pensionType: "SSS",
        branchId: 1,
        createdAt: "2026-01-07T00:00:00Z",
        updatedAt: "2026-01-07T00:00:00Z",
    },

    // 8. ANTONIO FLORES - NO POSTED COLLECTIONS
    {
        id: 8,
        clientId: 8,
        agentId: 2,
        pensionAmount: 9000,
        monthlyInstallment: 3000,
        availableChangeAmount: 0,
        changeAmount: 6000,
        withdrawAll: false,
        collectionDay: 15,
        pensionType: "SSS",
        branchId: 3,
        createdAt: "2026-01-08T00:00:00Z",
        updatedAt: "2026-01-08T00:00:00Z",
    },

    // 9. CARMEN BAUTISTA - RETURNEE
    {
        id: 9,
        clientId: 9,
        agentId: 3,
        pensionAmount: 13000,
        monthlyInstallment: 4000,
        availableChangeAmount: 0,
        changeAmount: 9000,
        withdrawAll: false,
        collectionDay: 18,
        pensionType: "SSS",
        branchId: 1,
        createdAt: "2026-01-09T00:00:00Z",
        updatedAt: "2026-01-09T00:00:00Z",
    },

    // 10. RICARDO NAVARRO - PAST DUE
    {
        id: 10,
        clientId: 10,
        agentId: 2,
        pensionAmount: 8500,
        monthlyInstallment: 2500,
        availableChangeAmount: 0,
        changeAmount: 6000,
        withdrawAll: false,
        collectionDay: 9,
        pensionType: "SSS",
        branchId: 3,
        createdAt: "2026-01-10T00:00:00Z",
        updatedAt: "2026-01-10T00:00:00Z",
    },

    // 11. TERESA AQUINO - HIGH VALUE RENEWAL
    {
        id: 11,
        clientId: 11,
        agentId: 1,
        pensionAmount: 25000,
        monthlyInstallment: 8000,
        availableChangeAmount: 0,
        changeAmount: 17000,
        withdrawAll: false,
        collectionDay: 22,
        pensionType: "GSIS",
        branchId: 1,
        createdAt: "2026-01-11T00:00:00Z",
        updatedAt: "2026-01-11T00:00:00Z",
    },

    // 12. FERNANDO CASTILLO - TRANSFER
    {
        id: 12,
        clientId: 12,
        agentId: 2,
        pensionAmount: 17500,
        monthlyInstallment: 6000,
        availableChangeAmount: 0,
        changeAmount: 11500,
        withdrawAll: false,
        collectionDay: 11,
        pensionType: "GSIS",
        branchId: 2,
        createdAt: "2026-01-12T00:00:00Z",
        updatedAt: "2026-01-12T00:00:00Z",
    },

    // 13. LOURDES MERCADO - PARTIAL PAYMENT
    {
        id: 13,
        clientId: 13,
        agentId: 3,
        pensionAmount: 14500,
        monthlyInstallment: 4800,
        availableChangeAmount: 0,
        changeAmount: 9700,
        withdrawAll: false,
        collectionDay: 27,
        pensionType: "SSS",
        branchId: 2,
        createdAt: "2026-01-13T00:00:00Z",
        updatedAt: "2026-01-13T00:00:00Z",
    },

    // 14. EDUARDO CRUZ - LARGE PRINCIPAL
    {
        id: 14,
        clientId: 14,
        agentId: 1,
        pensionAmount: 30000,
        monthlyInstallment: 9500,
        availableChangeAmount: 0,
        changeAmount: 20500,
        withdrawAll: false,
        collectionDay: 3,
        pensionType: "GSIS",
        branchId: 1,
        createdAt: "2026-01-14T00:00:00Z",
        updatedAt: "2026-01-14T00:00:00Z",
    },

    // 15. GLORIA FERNANDEZ - RENEWAL
    {
        id: 15,
        clientId: 15,
        agentId: 1,
        pensionAmount: 11000,
        monthlyInstallment: 3700,
        availableChangeAmount: 0,
        changeAmount: 7300,
        withdrawAll: false,
        collectionDay: 19,
        pensionType: "SSS",
        branchId: 1,
        createdAt: "2026-01-15T00:00:00Z",
        updatedAt: "2026-01-15T00:00:00Z",
    },

    // 16. RAMON TORRES - CLOSED LOAN
    {
        id: 16,
        clientId: 16,
        agentId: 2,
        pensionAmount: 11500,
        monthlyInstallment: 4000,
        availableChangeAmount: 0,
        changeAmount: 7500,
        withdrawAll: false,
        collectionDay: 8,
        pensionType: "SSS",
        branchId: 2,
        createdAt: "2026-01-16T00:00:00Z",
        updatedAt: "2026-01-16T00:00:00Z",
    },

    // 17. ROSARIO LIM - RETURNEE
    {
        id: 17,
        clientId: 17,
        agentId: 1,
        pensionAmount: 15500,
        monthlyInstallment: 5200,
        availableChangeAmount: 0,
        changeAmount: 10300,
        withdrawAll: false,
        collectionDay: 24,
        pensionType: "SSS",
        branchId: 1,
        createdAt: "2026-01-17T00:00:00Z",
        updatedAt: "2026-01-17T00:00:00Z",
    },

    // 18. ALFREDO GONZALES - NO COLLECTIONS
    {
        id: 18,
        clientId: 18,
        agentId: 2,
        pensionAmount: 7500,
        monthlyInstallment: 2000,
        availableChangeAmount: 0,
        changeAmount: 5500,
        withdrawAll: false,
        collectionDay: 13,
        pensionType: "SSS",
        branchId: 1,
        createdAt: "2026-01-18T00:00:00Z",
        updatedAt: "2026-01-18T00:00:00Z",
    },

    // 19. NORA SALAZAR - ADDITIONAL LOAN
    {
        id: 19,
        clientId: 19,
        agentId: 3,
        pensionAmount: 21000,
        monthlyInstallment: 6800,
        availableChangeAmount: 0,
        changeAmount: 14200,
        withdrawAll: false,
        collectionDay: 4,
        pensionType: "GSIS",
        branchId: 2,
        createdAt: "2026-01-19T00:00:00Z",
        updatedAt: "2026-01-19T00:00:00Z",
    },

    // 20. BENJAMIN LOPEZ - FUTURE EFFECTIVITY
    {
        id: 20,
        clientId: 20,
        agentId: 1,
        pensionAmount: 32000,
        monthlyInstallment: 10500,
        availableChangeAmount: 0,
        changeAmount: 21500,
        withdrawAll: false,
        collectionDay: 21,
        pensionType: "GSIS",
        branchId: 1,
        createdAt: "2026-01-20T00:00:00Z",
        updatedAt: "2026-01-20T00:00:00Z",
    },
];
