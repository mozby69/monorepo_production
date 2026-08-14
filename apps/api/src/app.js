"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const cors_config_1 = require("./config/cors.config");
const request_logger_middleware_1 = require("@/middleware/request-logger.middleware");
const app = (0, express_1.default)();
// ---------------------------
// Middlewares
// ---------------------------
app.use((0, cors_1.default)(cors_config_1.corsOptions));
app.use((0, cookie_parser_1.default)());
app.use(request_logger_middleware_1.requestLogger);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ---------------------------
// Routes
// ---------------------------
app.use("/api", routes_1.default);
exports.default = app;
