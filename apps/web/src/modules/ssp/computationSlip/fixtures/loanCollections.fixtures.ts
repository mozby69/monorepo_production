
import type {
    LoanCollection,
} from "../types/ssp-domain.types";

// =====================================================
// LOAN COLLECTION FIXTURES
// Source: Loan collection records
// =====================================================

export const loanCollectionsFixtures: LoanCollection[] = [
    // =================================================
    // CLIENT 1 - JUAN DELA CRUZ
    // Original records preserved
    // Scenario: Two fully posted installments
    // =================================================

    {
        id: 1,
        clientId: 1,
        loanId: 1001,
        collectionDate: "2026-09-01",
        batchNo: "BATCH-001",
        monthEffectivity: 9,
        yearEffectivity: 2026,
        amount: 5000,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567890",
        clientName: "Juan Dela Cruz",
        balanceTerms: 11,
        atmBalance: 10000,
        branchId: 1,
        createdAt: "2026-02-15T00:00:00Z",
        updatedAt: "2026-02-15T00:00:00Z",
    },
    {
        id: 2,
        clientId: 1,
        loanId: 1001,
        collectionDate: "2026-10-01",
        batchNo: "BATCH-002",
        monthEffectivity: 10,
        yearEffectivity: 2026,
        amount: 5000,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567890",
        clientName: "Juan Dela Cruz",
        balanceTerms: 10,
        atmBalance: 10000,
        branchId: 1,
        createdAt: "2026-03-15T00:00:00Z",
        updatedAt: "2026-03-15T00:00:00Z",
    },

    // =================================================
    // CLIENT 2 - MARIA SANTOS
    // Scenario: Two posted installments and one pending
    // =================================================

    {
        id: 3,
        clientId: 2,
        loanId: 1002,
        collectionDate: "2026-03-10",
        batchNo: "BATCH-003",
        monthEffectivity: 3,
        yearEffectivity: 2026,
        amount: 4200,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567891",
        clientName: "Maria Santos",
        balanceTerms: 23,
        atmBalance: 5000,
        branchId: 1,
        createdAt: "2026-03-10T00:00:00Z",
        updatedAt: "2026-03-10T00:00:00Z",
    },
    {
        id: 4,
        clientId: 2,
        loanId: 1002,
        collectionDate: "2026-04-10",
        batchNo: "BATCH-004",
        monthEffectivity: 4,
        yearEffectivity: 2026,
        amount: 4200,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567891",
        clientName: "Maria Santos",
        balanceTerms: 22,
        atmBalance: 5000,
        branchId: 1,
        createdAt: "2026-04-10T00:00:00Z",
        updatedAt: "2026-04-10T00:00:00Z",
    },
    {
        id: 5,
        clientId: 2,
        loanId: 1002,
        collectionDate: "2026-05-10",
        batchNo: "BATCH-005",
        monthEffectivity: 5,
        yearEffectivity: 2026,
        amount: 4200,
        posted: false,
        collectionStatus: "PENDING",
        bankNo: "1234567891",
        clientName: "Maria Santos",
        balanceTerms: 22,
        atmBalance: 5000,
        branchId: 1,
        createdAt: "2026-05-10T00:00:00Z",
        updatedAt: "2026-05-10T00:00:00Z",
    },

    // =================================================
    // CLIENT 3 - PEDRO REYES
    // Scenario: Posted payment and partial payment
    // =================================================

    {
        id: 6,
        clientId: 3,
        loanId: 1003,
        collectionDate: "2026-04-05",
        batchNo: "BATCH-006",
        monthEffectivity: 4,
        yearEffectivity: 2026,
        amount: 6500,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567892",
        clientName: "Pedro Reyes",
        balanceTerms: 35,
        atmBalance: 12000,
        branchId: 1,
        createdAt: "2026-04-05T00:00:00Z",
        updatedAt: "2026-04-05T00:00:00Z",
    },
    {
        id: 7,
        clientId: 3,
        loanId: 1003,
        collectionDate: "2026-05-05",
        batchNo: "BATCH-007",
        monthEffectivity: 5,
        yearEffectivity: 2026,
        amount: 3000,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567892",
        clientName: "Pedro Reyes",
        balanceTerms: 35,
        atmBalance: 12000,
        branchId: 1,
        createdAt: "2026-05-05T00:00:00Z",
        updatedAt: "2026-05-05T00:00:00Z",
    },

    // =================================================
    // CLIENT 4 - ANA GARCIA
    // Scenario: Closed loan, final posted collection
    // =================================================

    {
        id: 8,
        clientId: 4,
        loanId: 1004,
        collectionDate: "2026-01-10",
        batchNo: "BATCH-008",
        monthEffectivity: 1,
        yearEffectivity: 2026,
        amount: 3500,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567893",
        clientName: "Ana Garcia",
        balanceTerms: 0,
        atmBalance: 0,
        branchId: 2,
        createdAt: "2026-01-10T00:00:00Z",
        updatedAt: "2026-01-10T00:00:00Z",
    },

    // =================================================
    // CLIENT 5 - JOSE MENDOZA
    // Scenario: Two posted installments
    // =================================================

    {
        id: 9,
        clientId: 5,
        loanId: 1005,
        collectionDate: "2026-06-12",
        batchNo: "BATCH-009",
        monthEffectivity: 6,
        yearEffectivity: 2026,
        amount: 7200,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567894",
        clientName: "Jose Mendoza",
        balanceTerms: 35,
        atmBalance: 15000,
        branchId: 2,
        createdAt: "2026-06-12T00:00:00Z",
        updatedAt: "2026-06-12T00:00:00Z",
    },
    {
        id: 10,
        clientId: 5,
        loanId: 1005,
        collectionDate: "2026-07-12",
        batchNo: "BATCH-010",
        monthEffectivity: 7,
        yearEffectivity: 2026,
        amount: 7200,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567894",
        clientName: "Jose Mendoza",
        balanceTerms: 34,
        atmBalance: 15000,
        branchId: 2,
        createdAt: "2026-07-12T00:00:00Z",
        updatedAt: "2026-07-12T00:00:00Z",
    },

    // =================================================
    // CLIENT 6 - ROBERTO VILLANUEVA
    // Scenario: Pre-effectivity collection
    // =================================================

    {
        id: 11,
        clientId: 6,
        loanId: 1006,
        collectionDate: "2025-01-20",
        batchNo: "BATCH-011",
        monthEffectivity: 1,
        yearEffectivity: 2025,
        amount: 5500,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567895",
        clientName: "Roberto Villanueva",
        balanceTerms: 24,
        atmBalance: 0,
        branchId: 1,
        createdAt: "2025-01-20T00:00:00Z",
        updatedAt: "2025-01-20T00:00:00Z",
    },
    {
        id: 12,
        clientId: 6,
        loanId: 1006,
        collectionDate: "2025-02-15",
        batchNo: "BATCH-012",
        monthEffectivity: 2,
        yearEffectivity: 2025,
        amount: 5500,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567895",
        clientName: "Roberto Villanueva",
        balanceTerms: 23,
        atmBalance: 0,
        branchId: 1,
        createdAt: "2025-02-15T00:00:00Z",
        updatedAt: "2025-02-15T00:00:00Z",
    },

    // =================================================
    // CLIENT 7 - ELENA RAMOS
    // Scenario: One posted collection
    // =================================================

    {
        id: 13,
        clientId: 7,
        loanId: 1007,
        collectionDate: "2026-03-12",
        batchNo: "BATCH-013",
        monthEffectivity: 3,
        yearEffectivity: 2026,
        amount: 4000,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567896",
        clientName: "Elena Ramos",
        balanceTerms: 23,
        atmBalance: 4000,
        branchId: 1,
        createdAt: "2026-03-12T00:00:00Z",
        updatedAt: "2026-03-12T00:00:00Z",
    },

    // CLIENT 8 - ANTONIO FLORES
    // Scenario: No collections

    // =================================================
    // CLIENT 9 - CARMEN BAUTISTA
    // Scenario: Posted collections
    // =================================================

    {
        id: 14,
        clientId: 9,
        loanId: 1009,
        collectionDate: "2026-05-18",
        batchNo: "BATCH-014",
        monthEffectivity: 5,
        yearEffectivity: 2026,
        amount: 4000,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567898",
        clientName: "Carmen Bautista",
        balanceTerms: 23,
        atmBalance: 3000,
        branchId: 1,
        createdAt: "2026-05-18T00:00:00Z",
        updatedAt: "2026-05-18T00:00:00Z",
    },

    // =================================================
    // CLIENT 10 - RICARDO NAVARRO
    // Scenario: Past-due loan, pending collection
    // =================================================

    {
        id: 15,
        clientId: 10,
        loanId: 1010,
        collectionDate: "2026-04-09",
        batchNo: "BATCH-015",
        monthEffectivity: 4,
        yearEffectivity: 2026,
        amount: 2500,
        posted: false,
        collectionStatus: "PENDING",
        bankNo: "1234567899",
        clientName: "Ricardo Navarro",
        balanceTerms: 18,
        atmBalance: 0,
        branchId: 3,
        createdAt: "2026-04-09T00:00:00Z",
        updatedAt: "2026-04-09T00:00:00Z",
    },

    // =================================================
    // CLIENT 11 - TERESA AQUINO
    // Scenario: Two posted collections
    // =================================================

    {
        id: 16,
        clientId: 11,
        loanId: 1011,
        collectionDate: "2026-06-22",
        batchNo: "BATCH-016",
        monthEffectivity: 6,
        yearEffectivity: 2026,
        amount: 8000,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567900",
        clientName: "Teresa Aquino",
        balanceTerms: 35,
        atmBalance: 18000,
        branchId: 1,
        createdAt: "2026-06-22T00:00:00Z",
        updatedAt: "2026-06-22T00:00:00Z",
    },
    {
        id: 17,
        clientId: 11,
        loanId: 1011,
        collectionDate: "2026-07-22",
        batchNo: "BATCH-017",
        monthEffectivity: 7,
        yearEffectivity: 2026,
        amount: 8000,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567900",
        clientName: "Teresa Aquino",
        balanceTerms: 34,
        atmBalance: 18000,
        branchId: 1,
        createdAt: "2026-07-22T00:00:00Z",
        updatedAt: "2026-07-22T00:00:00Z",
    },

    // =================================================
    // CLIENT 12 - FERNANDO CASTILLO
    // Scenario: One posted collection
    // =================================================

    {
        id: 18,
        clientId: 12,
        loanId: 1012,
        collectionDate: "2026-06-11",
        batchNo: "BATCH-018",
        monthEffectivity: 6,
        yearEffectivity: 2026,
        amount: 6000,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567901",
        clientName: "Fernando Castillo",
        balanceTerms: 23,
        atmBalance: 7000,
        branchId: 2,
        createdAt: "2026-06-11T00:00:00Z",
        updatedAt: "2026-06-11T00:00:00Z",
    },

    // =================================================
    // CLIENT 13 - LOURDES MERCADO
    // Scenario: Partial posted payment
    // =================================================

    {
        id: 19,
        clientId: 13,
        loanId: 1013,
        collectionDate: "2026-07-27",
        batchNo: "BATCH-019",
        monthEffectivity: 7,
        yearEffectivity: 2026,
        amount: 2000,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567902",
        clientName: "Lourdes Mercado",
        balanceTerms: 24,
        atmBalance: 2000,
        branchId: 2,
        createdAt: "2026-07-27T00:00:00Z",
        updatedAt: "2026-07-27T00:00:00Z",
    },

    // =================================================
    // CLIENT 14 - EDUARDO CRUZ
    // Scenario: One posted collection
    // =================================================

    {
        id: 20,
        clientId: 14,
        loanId: 1014,
        collectionDate: "2026-07-03",
        batchNo: "BATCH-020",
        monthEffectivity: 7,
        yearEffectivity: 2026,
        amount: 9500,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567903",
        clientName: "Eduardo Cruz",
        balanceTerms: 35,
        atmBalance: 20000,
        branchId: 1,
        createdAt: "2026-07-03T00:00:00Z",
        updatedAt: "2026-07-03T00:00:00Z",
    },

    // =================================================
    // CLIENT 15 - GLORIA FERNANDEZ
    // Scenario: One posted collection
    // =================================================

    {
        id: 21,
        clientId: 15,
        loanId: 1015,
        collectionDate: "2026-08-19",
        batchNo: "BATCH-021",
        monthEffectivity: 8,
        yearEffectivity: 2026,
        amount: 3700,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567904",
        clientName: "Gloria Fernandez",
        balanceTerms: 23,
        atmBalance: 3000,
        branchId: 1,
        createdAt: "2026-08-19T00:00:00Z",
        updatedAt: "2026-08-19T00:00:00Z",
    },

    // =================================================
    // CLIENT 16 - RAMON TORRES
    // Scenario: Closed loan, final payment
    // =================================================

    {
        id: 22,
        clientId: 16,
        loanId: 1016,
        collectionDate: "2026-07-08",
        batchNo: "BATCH-022",
        monthEffectivity: 7,
        yearEffectivity: 2026,
        amount: 4000,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567905",
        clientName: "Ramon Torres",
        balanceTerms: 0,
        atmBalance: 0,
        branchId: 2,
        createdAt: "2026-07-08T00:00:00Z",
        updatedAt: "2026-07-08T00:00:00Z",
    },

    // =================================================
    // CLIENT 17 - ROSARIO LIM
    // Scenario: One posted collection
    // =================================================

    {
        id: 23,
        clientId: 17,
        loanId: 1017,
        collectionDate: "2026-09-24",
        batchNo: "BATCH-023",
        monthEffectivity: 9,
        yearEffectivity: 2026,
        amount: 5200,
        posted: true,
        collectionStatus: "POSTED",
        bankNo: "1234567906",
        clientName: "Rosario Lim",
        balanceTerms: 23,
        atmBalance: 5000,
        branchId: 1,
        createdAt: "2026-09-24T00:00:00Z",
        updatedAt: "2026-09-24T00:00:00Z",
    },

    // CLIENT 18 - ALFREDO GONZALES
    // Scenario: No collections

    // CLIENT 19 - NORA SALAZAR
    // Scenario: No collections

    // CLIENT 20 - BENJAMIN LOPEZ
    // Scenario: Not yet effective, no collections
];
