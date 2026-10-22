
import type {
    SupplementaryLoanAccount,
} from "../types/ssp-supplementary.types";

export const supplementaryLoanFixtures:
    SupplementaryLoanAccount[] = [
        // 1. JUAN DELA CRUZ - ORIGINAL RECORD
        {
            id: 501,
            clientId: 1,
            branchId: 1,

            availmentDate: "2026-08-14",

            monthEffectivity: 9,
            yearEffectivity: 2026,

            beginningBalance: 10000,
            balanceAmount: 0,

            terms: 2,

            status: "ACTIVE",
            previous_sl_id: 0,

            createdAt: "2026-01-15T00:00:00Z",
            updatedAt: "2026-03-15T00:00:00Z",
        },

        // 2. MARIA SANTOS - ACTIVE SUPPLEMENTARY LOAN
        {
            id: 502,
            clientId: 2,
            branchId: 1,
            availmentDate: "2026-02-10",
            monthEffectivity: 3,
            yearEffectivity: 2026,
            beginningBalance: 12000,
            balanceAmount: 6000,
            terms: 12,
            status: "ACTIVE",
            previous_sl_id: 0,
            createdAt: "2026-02-10T00:00:00Z",
            updatedAt: "2026-04-10T00:00:00Z",
        },

        // 3. PEDRO REYES - PARTIAL COLLECTIONS
        {
            id: 503,
            clientId: 3,
            branchId: 1,
            availmentDate: "2026-03-05",
            monthEffectivity: 4,
            yearEffectivity: 2026,
            beginningBalance: 20000,
            balanceAmount: 17500,
            terms: 12,
            status: "ACTIVE",
            previous_sl_id: 0,
            createdAt: "2026-03-05T00:00:00Z",
            updatedAt: "2026-05-05T00:00:00Z",
        },

        // 4. CARMEN BAUTISTA - ACTIVE SUPPLEMENTARY LOAN
        {
            id: 504,
            clientId: 9,
            branchId: 1,
            availmentDate: "2026-04-18",
            monthEffectivity: 5,
            yearEffectivity: 2026,
            beginningBalance: 15000,
            balanceAmount: 11000,
            terms: 12,
            status: "ACTIVE",
            previous_sl_id: 0,
            createdAt: "2026-04-18T00:00:00Z",
            updatedAt: "2026-06-18T00:00:00Z",
        },

        // 5. JOSE MENDOZA - HIGHER SUPPLEMENTARY BALANCE
        {
            id: 505,
            clientId: 5,
            branchId: 2,
            availmentDate: "2026-05-12",
            monthEffectivity: 6,
            yearEffectivity: 2026,
            beginningBalance: 30000,
            balanceAmount: 25000,
            terms: 18,
            status: "ACTIVE",
            previous_sl_id: 0,
            createdAt: "2026-05-12T00:00:00Z",
            updatedAt: "2026-06-12T00:00:00Z",
        },

        // 6. ROBERTO VILLANUEVA - HISTORICAL LOAN
        {
            id: 506,
            clientId: 6,
            branchId: 1,
            availmentDate: "2025-10-15",
            monthEffectivity: 11,
            yearEffectivity: 2025,
            beginningBalance: 12000,
            balanceAmount: 11000,
            terms: 12,
            status: "ACTIVE",
            previous_sl_id: 0,
            createdAt: "2025-10-15T00:00:00Z",
            updatedAt: "2025-11-15T00:00:00Z",
        },

        // 7. LOURDES MERCADO - SMALL SUPPLEMENTARY LOAN
        {
            id: 507,
            clientId: 13,
            branchId: 2,
            availmentDate: "2026-06-27",
            monthEffectivity: 7,
            yearEffectivity: 2026,
            beginningBalance: 5000,
            balanceAmount: 4000,
            terms: 6,
            status: "ACTIVE",
            previous_sl_id: 0,
            createdAt: "2026-06-27T00:00:00Z",
            updatedAt: "2026-07-27T00:00:00Z",
        },

        // 8. EDUARDO CRUZ - LARGE SUPPLEMENTARY LOAN
        {
            id: 508,
            clientId: 14,
            branchId: 1,
            availmentDate: "2026-06-03",
            monthEffectivity: 7,
            yearEffectivity: 2026,
            beginningBalance: 50000,
            balanceAmount: 40000,
            terms: 18,
            status: "ACTIVE",
            previous_sl_id: 0,
            createdAt: "2026-06-03T00:00:00Z",
            updatedAt: "2026-08-03T00:00:00Z",
        },

        // 9. BENJAMIN LOPEZ - FUTURE EFFECTIVITY
        {
            id: 509,
            clientId: 20,
            branchId: 1,
            availmentDate: "2026-10-21",
            monthEffectivity: 11,
            yearEffectivity: 2026,
            beginningBalance: 60000,
            balanceAmount: 60000,
            terms: 24,
            status: "ACTIVE",
            previous_sl_id: 0,
            createdAt: "2026-10-21T00:00:00Z",
            updatedAt: "2026-10-21T00:00:00Z",
        },

        // 10. ROSARIO LIM - ACTIVE SUPPLEMENTARY LOAN
        {
            id: 510,
            clientId: 17,
            branchId: 1,
            availmentDate: "2026-08-24",
            monthEffectivity: 9,
            yearEffectivity: 2026,
            beginningBalance: 18000,
            balanceAmount: 16000,
            terms: 12,
            status: "ACTIVE",
            previous_sl_id: 0,
            createdAt: "2026-08-24T00:00:00Z",
            updatedAt: "2026-09-24T00:00:00Z",
        },

        // 11. TERESA AQUINO - HIGH VALUE SUPPLEMENTARY LOAN
        {
            id: 511,
            clientId: 11,
            branchId: 1,
            availmentDate: "2026-05-22",
            monthEffectivity: 6,
            yearEffectivity: 2026,
            beginningBalance: 45000,
            balanceAmount: 35000,
            terms: 18,
            status: "ACTIVE",
            previous_sl_id: 0,
            createdAt: "2026-05-22T00:00:00Z",
            updatedAt: "2026-07-22T00:00:00Z",
        },

        // 12. NORA SALAZAR - PARTIAL COLLECTION
        {
            id: 512,
            clientId: 19,
            branchId: 2,
            availmentDate: "2026-09-04",
            monthEffectivity: 10,
            yearEffectivity: 2026,
            beginningBalance: 22000,
            balanceAmount: 21000,
            terms: 12,
            status: "ACTIVE",
            previous_sl_id: 0,
            createdAt: "2026-09-04T00:00:00Z",
            updatedAt: "2026-10-04T00:00:00Z",
        },

        // 13. GLORIA FERNANDEZ - SMALL SUPPLEMENTARY LOAN
        {
            id: 513,
            clientId: 15,
            branchId: 1,
            availmentDate: "2026-07-19",
            monthEffectivity: 8,
            yearEffectivity: 2026,
            beginningBalance: 8000,
            balanceAmount: 6000,
            terms: 12,
            status: "ACTIVE",
            previous_sl_id: 0,
            createdAt: "2026-07-19T00:00:00Z",
            updatedAt: "2026-08-19T00:00:00Z",
        },
    ];
