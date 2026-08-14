import pinoHttp from "pino-http";
import { logger } from "@/lib/logger/logger";
import type { Request } from "express";

export const requestLogger = pinoHttp({
    logger,

    customProps: (req) => {
        const expressReq = req as Request;

        return {
            userId: expressReq.user?.id,
        };
    },

    customLogLevel: (_req, res, error) => {
        if (error || res.statusCode >= 500) {
            return "error";
        }

        if (res.statusCode >= 400) {
            return "warn";
        }

        return "info";
    },
});