
import type {
    SupplementaryLoanCharge,
} from "../types/ssp-supplementary.types";

export const supplementaryChargesFixtures:
    SupplementaryLoanCharge[] = [
        // ================================================
        // SL 501 - ORIGINAL RECORDS
        // ================================================
        {
            id: 1,
            slId: 501,

            monthEffectivity: 9,
            yearEffectivity: 2026,

            slBalance: 10000,
            interestAmount: 150,

            status: "UNPAID",
            dueDate: "2026-09-31",

            branchId: 1,

            createdAt: "2026-02-01T00:00:00Z",
            updatedAt: "2026-02-15T00:00:00Z",
        },
        {
            id: 2,
            slId: 501,

            monthEffectivity: 10,
            yearEffectivity: 2026,

            slBalance: 8000,
            interestAmount: 120,

            status: "UNPAID",
            dueDate: "2026-03-15",

            branchId: 1,

            createdAt: "2026-03-01T00:00:00Z",
            updatedAt: "2026-03-01T00:00:00Z",
        },

        // ================================================
        // SL 501 - ADDITIONAL UNPAID MONTH
        // ================================================
        {
            id: 3,
            slId: 50,
            monthEffectivity: 4,
            yearEffectivity: 2026,
            slBalance: 8000,
            interestAmount: 80,
            status: "UNPAID",
            dueDate: "2026-04-15",
            branchId: 1,
            createdAt: "2026-04-01T00:00:00Z",
            updatedAt: "2026-04-01T00:00:00Z",
        },

        // ================================================
        // SL 502 - FULLY PAID CHARGES
        // ================================================
        {
            id: 4,
            slId: 502,
            monthEffectivity: 3,
            yearEffectivity: 2026,
            slBalance: 12000,
            interestAmount: 120,
            status: "PAID",
            dueDate: "2026-03-10",
            branchId: 1,
            createdAt: "2026-03-01T00:00:00Z",
            updatedAt: "2026-03-10T00:00:00Z",
        },
        {
            id: 5,
            slId: 502,
            monthEffectivity: 4,
            yearEffectivity: 2026,
            slBalance: 9000,
            interestAmount: 90,
            status: "PAID",
            dueDate: "2026-04-10",
            branchId: 1,
            createdAt: "2026-04-01T00:00:00Z",
            updatedAt: "2026-04-10T00:00:00Z",
        },

        // ================================================
        // SL 503 - MULTIPLE UNPAID CHARGES
        // ================================================
        {
            id: 6,
            slId: 503,
            monthEffectivity: 4,
            yearEffectivity: 2026,
            slBalance: 20000,
            interestAmount: 200,
            status: "UNPAID",
            dueDate: "2026-04-05",
            branchId: 1,
            createdAt: "2026-04-01T00:00:00Z",
            updatedAt: "2026-04-01T00:00:00Z",
        },
        {
            id: 7,
            slId: 503,
            monthEffectivity: 5,
            yearEffectivity: 2026,
            slBalance: 18000,
            interestAmount: 180,
            status: "UNPAID",
            dueDate: "2026-05-05",
            branchId: 1,
            createdAt: "2026-05-01T00:00:00Z",
            updatedAt: "2026-05-01T00:00:00Z",
        },
        {
            id: 8,
            slId: 503,
            monthEffectivity: 6,
            yearEffectivity: 2026,
            slBalance: 16000,
            interestAmount: 160,
            status: "UNPAID",
            dueDate: "2026-06-05",
            branchId: 1,
            createdAt: "2026-06-01T00:00:00Z",
            updatedAt: "2026-06-01T00:00:00Z",
        },

        // ================================================
        // SL 504 - MIXED PAID AND UNPAID
        // ================================================
        {
            id: 9,
            slId: 504,
            monthEffectivity: 5,
            yearEffectivity: 2026,
            slBalance: 15000,
            interestAmount: 150,
            status: "PAID",
            dueDate: "2026-05-18",
            branchId: 1,
            createdAt: "2026-05-01T00:00:00Z",
            updatedAt: "2026-05-18T00:00:00Z",
        },
        {
            id: 10,
            slId: 504,
            monthEffectivity: 6,
            yearEffectivity: 2026,
            slBalance: 13000,
            interestAmount: 130,
            status: "UNPAID",
            dueDate: "2026-06-18",
            branchId: 1,
            createdAt: "2026-06-01T00:00:00Z",
            updatedAt: "2026-06-01T00:00:00Z",
        },

        // ================================================
        // SL 505 - SINGLE UNPAID CHARGE
        // ================================================
        {
            id: 11,
            slId: 505,
            monthEffectivity: 6,
            yearEffectivity: 2026,
            slBalance: 30000,
            interestAmount: 300,
            status: "UNPAID",
            dueDate: "2026-06-12",
            branchId: 2,
            createdAt: "2026-06-01T00:00:00Z",
            updatedAt: "2026-06-01T00:00:00Z",
        },

        // ================================================
        // SL 506 - HISTORICAL OVERDUE CHARGES
        // ================================================
        {
            id: 12,
            slId: 506,
            monthEffectivity: 11,
            yearEffectivity: 2025,
            slBalance: 11000,
            interestAmount: 110,
            status: "UNPAID",
            dueDate: "2025-11-15",
            branchId: 1,
            createdAt: "2025-11-01T00:00:00Z",
            updatedAt: "2025-11-01T00:00:00Z",
        },
        {
            id: 13,
            slId: 506,
            monthEffectivity: 12,
            yearEffectivity: 2025,
            slBalance: 11000,
            interestAmount: 110,
            status: "UNPAID",
            dueDate: "2025-12-15",
            branchId: 1,
            createdAt: "2025-12-01T00:00:00Z",
            updatedAt: "2025-12-01T00:00:00Z",
        },

        // ================================================
        // SL 507 - PREVIOUSLY PAID, CURRENTLY UNPAID
        // ================================================
        {
            id: 14,
            slId: 507,
            monthEffectivity: 7,
            yearEffectivity: 2026,
            slBalance: 5000,
            interestAmount: 50,
            status: "PAID",
            dueDate: "2026-07-27",
            branchId: 2,
            createdAt: "2026-07-01T00:00:00Z",
            updatedAt: "2026-07-27T00:00:00Z",
        },
        {
            id: 15,
            slId: 507,
            monthEffectivity: 8,
            yearEffectivity: 2026,
            slBalance: 4000,
            interestAmount: 40,
            status: "UNPAID",
            dueDate: "2026-08-27",
            branchId: 2,
            createdAt: "2026-08-01T00:00:00Z",
            updatedAt: "2026-08-01T00:00:00Z",
        },

        // ================================================
        // SL 508 - MULTIPLE MONTHLY CHARGES
        // ================================================
        {
            id: 16,
            slId: 508,
            monthEffectivity: 7,
            yearEffectivity: 2026,
            slBalance: 50000,
            interestAmount: 500,
            status: "PAID",
            dueDate: "2026-07-03",
            branchId: 1,
            createdAt: "2026-07-01T00:00:00Z",
            updatedAt: "2026-07-03T00:00:00Z",
        },
        {
            id: 17,
            slId: 508,
            monthEffectivity: 8,
            yearEffectivity: 2026,
            slBalance: 45000,
            interestAmount: 450,
            status: "PAID",
            dueDate: "2026-08-03",
            branchId: 1,
            createdAt: "2026-08-01T00:00:00Z",
            updatedAt: "2026-08-03T00:00:00Z",
        },
        {
            id: 18,
            slId: 508,
            monthEffectivity: 9,
            yearEffectivity: 2026,
            slBalance: 40000,
            interestAmount: 400,
            status: "UNPAID",
            dueDate: "2026-09-03",
            branchId: 1,
            createdAt: "2026-09-01T00:00:00Z",
            updatedAt: "2026-09-01T00:00:00Z",
        },

        // ================================================
        // SL 509 - FUTURE EFFECTIVITY
        // ================================================
        {
            id: 19,
            slId: 509,
            monthEffectivity: 11,
            yearEffectivity: 2026,
            slBalance: 60000,
            interestAmount: 600,
            status: "UNPAID",
            dueDate: "2026-11-21",
            branchId: 1,
            createdAt: "2026-10-01T00:00:00Z",
            updatedAt: "2026-10-01T00:00:00Z",
        },

        // ================================================
        // SL 510 - ONE PAID CHARGE
        // ================================================
        {
            id: 20,
            slId: 510,
            monthEffectivity: 9,
            yearEffectivity: 2026,
            slBalance: 18000,
            interestAmount: 180,
            status: "PAID",
            dueDate: "2026-09-24",
            branchId: 1,
            createdAt: "2026-09-01T00:00:00Z",
            updatedAt: "2026-09-24T00:00:00Z",
        },
    ];
