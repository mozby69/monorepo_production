"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = initializeSocket;
const socket_io_1 = require("socket.io");
const env_1 = require("./env");
const socket_1 = require("@/socket");
const allowedOrigins = [
    env_1.env.FRONTEND_URL,
    env_1.env.FRONTEND_LAN_URL,
];
function initializeSocket(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: allowedOrigins,
            credentials: true,
        },
    });
    (0, socket_1.registerSocketHandlers)(io);
    return io;
}
