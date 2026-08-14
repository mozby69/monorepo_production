// apps/api/src/config/logger.config.ts

import { env } from "./env";
import fs from "node:fs";
import path from "node:path";
import pino from "pino";

export const logDirectory = path.resolve(process.cwd(), "logs");

fs.mkdirSync(logDirectory, {
    recursive: true,
});

export const loggerOptions: pino.LoggerOptions = {
    level: env.NODE_ENV === "production" ? "info" : "debug",

    redact: {
        paths: [
            "req.headers.authorization",
            "req.headers.cookie",
            "password",
            "*.password",
            "passwordHash",
            "*.passwordHash",
            "accessToken",
            "refreshToken",
        ],
        censor: "[REDACTED]",
    },

    timestamp: pino.stdTimeFunctions.isoTime,
};

export const loggerStreams: pino.StreamEntry[] = [
    {
        level: "info",
        stream: pino.destination({
            dest: path.join(logDirectory, "app.log"),
            sync: false,
        }),
    },

    {
        level: "error",
        stream: pino.destination({
            dest: path.join(logDirectory, "error.log"),
            sync: false,
        }),
    },
];

if (env.NODE_ENV !== "production") {
    loggerStreams.push({
        level: "debug",
        stream: pino.transport({
            target: "pino-pretty",
            options: {
                colorize: true,
                translateTime: "SYS:standard",
                ignore: "pid,hostname",
            },
        }),
    });
}