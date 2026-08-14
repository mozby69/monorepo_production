"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const socket_config_1 = require("./config/socket.config");
const logger_1 = require("@/lib/logger/logger");
dotenv_1.default.config();
const PORT = Number(process.env.PORT) || 5000;
const server = http_1.default.createServer(app_1.default);
// ---------------------------
// Socket.io
// ---------------------------
exports.io = (0, socket_config_1.initializeSocket)(server);
// ---------------------------
// Start Server (LAN Ready)
// ---------------------------
logger_1.logger.info("Server started");
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
