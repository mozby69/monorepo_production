import type { NextFunction, Request, Response } from "express";

import { sendSuccess } from "@/lib/http/response";
import * as dashboardService from "./dashboard.service";

export async function getDashboardController(
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const dashboard =
            await dashboardService.getDashboard();

        sendSuccess(res, dashboard);
    } catch (error) {
        next(error);
    }
}