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

export const pensionerFixtures: Pensioner[] =
    clientMainFixtures.map((client) => {
        const pensionInfo =
            pensionLoanInfoFixtures.find(
                (info) =>
                    info.clientId === client.id
            ) ?? null;

        return mapPensionerToView(
            client,
            pensionInfo
        );
    });