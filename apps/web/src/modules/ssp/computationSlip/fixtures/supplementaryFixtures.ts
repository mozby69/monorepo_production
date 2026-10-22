
import type {
    SupplementaryCharge,
} from "../services/computation.manager.types";

interface SupplementaryChargeGroup {
    current: SupplementaryCharge[];
    carried: SupplementaryCharge[];
}

export const supplementaryChargeFixtures: Record<
    string,
    SupplementaryChargeGroup
> = {
    // ================================================
    // CLIENT 1 - JUAN DELA CRUZ
    // ORIGINAL RECORDS PRESERVED
    // ================================================
    "ACC-2026-001": {
        current: [
            {
                id: "CHG-001",
                chargeMonth: "2026-08-01",
                principalBasis: 15000,
                chargeAmount: 150,
                paidAmount: 0,
            },
            {
                id: "CHG-002",
                chargeMonth: "2026-09-01",
                principalBasis: 15000,
                chargeAmount: 150,
                paidAmount: 50,
            },
        ],
        carried: [
            {
                id: "CHG-003",
                chargeMonth: "2026-07-01",
                principalBasis: 15000,
                chargeAmount: 150,
                paidAmount: 0,
            },
        ],
    },

    // ================================================
    // CLIENT 2 - MARIA SANTOS
    // ALL CHARGES PAID
    // ================================================
    "ACC-2026-002": {
        current: [
            {
                id: "CHG-004",
                chargeMonth: "2026-09-01",
                principalBasis: 12000,
                chargeAmount: 120,
                paidAmount: 120,
            },
        ],
        carried: [
            {
                id: "CHG-005",
                chargeMonth: "2026-08-01",
                principalBasis: 12000,
                chargeAmount: 120,
                paidAmount: 120,
            },
        ],
    },

    // ================================================
    // CLIENT 3 - PEDRO REYES
    // MULTIPLE UNPAID CHARGES
    // ================================================
    "ACC-2026-003": {
        current: [
            {
                id: "CHG-006",
                chargeMonth: "2026-09-01",
                principalBasis: 20000,
                chargeAmount: 200,
                paidAmount: 0,
            },
            {
                id: "CHG-007",
                chargeMonth: "2026-10-01",
                principalBasis: 20000,
                chargeAmount: 200,
                paidAmount: 0,
            },
        ],
        carried: [
            {
                id: "CHG-008",
                chargeMonth: "2026-08-01",
                principalBasis: 20000,
                chargeAmount: 200,
                paidAmount: 0,
            },
        ],
    },

    // ================================================
    // CLIENT 4 - ANA GARCIA
    // NO SUPPLEMENTARY CHARGES
    // ================================================
    "ACC-2026-004": {
        current: [],
        carried: [],
    },

    // ================================================
    // CLIENT 5 - JOSE MENDOZA
    // PARTIALLY PAID CHARGES
    // ================================================
    "ACC-2026-005": {
        current: [
            {
                id: "CHG-009",
                chargeMonth: "2026-10-01",
                principalBasis: 30000,
                chargeAmount: 300,
                paidAmount: 100,
            },
        ],
        carried: [
            {
                id: "CHG-010",
                chargeMonth: "2026-09-01",
                principalBasis: 30000,
                chargeAmount: 300,
                paidAmount: 150,
            },
        ],
    },

    // ================================================
    // CLIENT 6 - ROBERTO VILLANUEVA
    // CARRIED CHARGES ONLY
    // ================================================
    "ACC-2026-006": {
        current: [],
        carried: [
            {
                id: "CHG-011",
                chargeMonth: "2026-07-01",
                principalBasis: 12000,
                chargeAmount: 120,
                paidAmount: 0,
            },
            {
                id: "CHG-012",
                chargeMonth: "2026-08-01",
                principalBasis: 12000,
                chargeAmount: 120,
                paidAmount: 0,
            },
        ],
    },

    // ================================================
    // CLIENT 7 - ELENA RAMOS
    // NO SUPPLEMENTARY CHARGES
    // ================================================
    "ACC-2026-007": {
        current: [],
        carried: [],
    },

    // ================================================
    // CLIENT 8 - ANTONIO FLORES
    // NO SUPPLEMENTARY CHARGES
    // ================================================
    "ACC-2026-008": {
        current: [],
        carried: [],
    },

    // ================================================
    // CLIENT 9 - CARMEN BAUTISTA
    // SINGLE UNPAID CHARGE
    // ================================================
    "ACC-2026-009": {
        current: [
            {
                id: "CHG-013",
                chargeMonth: "2026-10-01",
                principalBasis: 8000,
                chargeAmount: 80,
                paidAmount: 0,
            },
        ],
        carried: [],
    },

    // ================================================
    // CLIENT 10 - RICARDO NAVARRO
    // NO SUPPLEMENTARY CHARGES
    // ================================================
    "ACC-2026-010": {
        current: [],
        carried: [],
    },

    // ================================================
    // CLIENT 11 - TERESA AQUINO
    // HIGH VALUE SUPPLEMENTARY CHARGES
    // ================================================
    "ACC-2026-011": {
        current: [
            {
                id: "CHG-014",
                chargeMonth: "2026-10-01",
                principalBasis: 45000,
                chargeAmount: 450,
                paidAmount: 0,
            },
        ],
        carried: [
            {
                id: "CHG-015",
                chargeMonth: "2026-09-01",
                principalBasis: 45000,
                chargeAmount: 450,
                paidAmount: 200,
            },
        ],
    },

    // ================================================
    // CLIENT 12 - FERNANDO CASTILLO
    // NO SUPPLEMENTARY CHARGES
    // ================================================
    "ACC-2026-012": {
        current: [],
        carried: [],
    },

    // ================================================
    // CLIENT 13 - LOURDES MERCADO
    // SMALL SUPPLEMENTARY CHARGES
    // ================================================
    "ACC-2026-013": {
        current: [
            {
                id: "CHG-016",
                chargeMonth: "2026-10-01",
                principalBasis: 5000,
                chargeAmount: 50,
                paidAmount: 0,
            },
        ],
        carried: [
            {
                id: "CHG-017",
                chargeMonth: "2026-09-01",
                principalBasis: 5000,
                chargeAmount: 50,
                paidAmount: 25,
            },
        ],
    },

    // ================================================
    // CLIENT 14 - EDUARDO CRUZ
    // MULTIPLE MONTHLY CHARGES
    // ================================================
    "ACC-2026-014": {
        current: [
            {
                id: "CHG-018",
                chargeMonth: "2026-10-01",
                principalBasis: 50000,
                chargeAmount: 500,
                paidAmount: 0,
            },
        ],
        carried: [
            {
                id: "CHG-019",
                chargeMonth: "2026-08-01",
                principalBasis: 50000,
                chargeAmount: 500,
                paidAmount: 500,
            },
            {
                id: "CHG-020",
                chargeMonth: "2026-09-01",
                principalBasis: 50000,
                chargeAmount: 500,
                paidAmount: 250,
            },
        ],
    },

    // ================================================
    // CLIENT 15 - GLORIA FERNANDEZ
    // NO SUPPLEMENTARY CHARGES
    // ================================================
    "ACC-2026-015": {
        current: [],
        carried: [],
    },

    // ================================================
    // CLIENT 16 - RAMON TORRES
    // CLOSED LOAN
    // ================================================
    "ACC-2026-016": {
        current: [],
        carried: [],
    },

    // ================================================
    // CLIENT 17 - ROSARIO LIM
    // PARTIALLY PAID CHARGE
    // ================================================
    "ACC-2026-017": {
        current: [
            {
                id: "CHG-021",
                chargeMonth: "2026-10-01",
                principalBasis: 18000,
                chargeAmount: 180,
                paidAmount: 80,
            },
        ],
        carried: [],
    },

    // ================================================
    // CLIENT 18 - ALFREDO GONZALES
    // NO SUPPLEMENTARY CHARGES
    // ================================================
    "ACC-2026-018": {
        current: [],
        carried: [],
    },

    // ================================================
    // CLIENT 19 - NORA SALAZAR
    // UNPAID SUPPLEMENTARY CHARGES
    // ================================================
    "ACC-2026-019": {
        current: [
            {
                id: "CHG-022",
                chargeMonth: "2026-10-01",
                principalBasis: 22000,
                chargeAmount: 220,
                paidAmount: 0,
            },
        ],
        carried: [],
    },

    // ================================================
    // CLIENT 20 - BENJAMIN LOPEZ
    // FUTURE EFFECTIVITY
    // ================================================
    "ACC-2026-020": {
        current: [
            {
                id: "CHG-023",
                chargeMonth: "2026-11-01",
                principalBasis: 60000,
                chargeAmount: 600,
                paidAmount: 0,
            },
        ],
        carried: [],
    },
};
