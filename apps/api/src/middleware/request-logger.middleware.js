"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const pino_http_1 = __importDefault(require("pino-http"));
const logger_1 = require("@/lib/logger/logger");
exports.requestLogger = (0, pino_http_1.default)({
    logger: logger_1.logger,
    customProps: (req) => {
        const expressReq = req;
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
