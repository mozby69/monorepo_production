import pino from "pino";

import { loggerOptions, loggerStreams } from "@/config/logger.config";

export const logger = pino(
    loggerOptions,
    pino.multistream(loggerStreams)
);