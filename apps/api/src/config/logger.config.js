"use strict";
// apps/api/src/config/logger.config.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerStreams = exports.loggerOptions = exports.logDirectory = void 0;
const env_1 = require("./env");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const pino_1 = __importDefault(require("pino"));
exports.logDirectory = node_path_1.default.resolve(process.cwd(), "logs");
node_fs_1.default.mkdirSync(exports.logDirectory, {
    recursive: true,
});
exports.loggerOptions = {
    level: env_1.env.NODE_ENV === "production" ? "info" : "debug",
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
    timestamp: pino_1.default.stdTimeFunctions.isoTime,
};
exports.loggerStreams = [
    {
        level: "info",
        stream: pino_1.default.destination({
            dest: node_path_1.default.join(exports.logDirectory, "app.log"),
            sync: false,
        }),
    },
    {
        level: "error",
        stream: pino_1.default.destination({
            dest: node_path_1.default.join(exports.logDirectory, "error.log"),
            sync: false,
        }),
    },
];
if (env_1.env.NODE_ENV !== "production") {
    exports.loggerStreams.push({
        level: "debug",
        stream: pino_1.default.transport({
            target: "pino-pretty",
            options: {
                colorize: true,
                translateTime: "SYS:standard",
                ignore: "pid,hostname",
            },
        }),
    });
}
