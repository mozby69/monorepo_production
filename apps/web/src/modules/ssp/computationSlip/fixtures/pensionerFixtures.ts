import type {
    Pensioner,
} from "../types/computationSlip.types";

import {
    clientMainFixtures,
} from "./clientMain.fixtures";

import {
    pensionLoanInfoFixtures,
} from "./pensionLoanInfo.fixtures";

import {
    mapPensionerToView,
} from "../services/computation.mapper";

// =====================================================
// PENSIONER FIXTURES
// Derived from pen_client_main + pension loan info
// =====================================================

export const pensionerFixtures: Pensioner[] =
    clientMainFixtures.map((client) => {
        const pensionInfo =
            pensionLoanInfoFixtures.find(
                (info) => info.clientId === client.id
            ) ?? null;

        if (!pensionInfo) {
            console.warn(
                `[Pensioner Fixture] Missing pension loan info for client ${client.id}`
            );
        }

        return mapPensionerToView(
            client,
            pensionInfo
        );
    });