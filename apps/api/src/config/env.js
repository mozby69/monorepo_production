"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(5000),
    DATABASE_URL: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string().min(1),
    JWT_EXPIRES_IN: zod_1.z.string().default("1d"),
    FRONTEND_URL: zod_1.z.string().url(),
    FRONTEND_LAN_URL: zod_1.z.string().url(),
    NODE_ENV: zod_1.z
        .enum(["development", "test", "production"])
        .default("development"),
});
exports.env = envSchema.parse(process.env);
