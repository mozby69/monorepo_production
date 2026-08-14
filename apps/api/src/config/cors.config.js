"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const env_1 = require("./env");
const allowedOrigins = [
    env_1.env.FRONTEND_URL,
    env_1.env.FRONTEND_LAN_URL,
].filter(Boolean);
exports.corsOptions = {
    origin(origin, callback) {
        // Allow requests from tools like Postman
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
};
