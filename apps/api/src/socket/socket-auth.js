"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateSocket = authenticateSocket;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateSocket(socket, next) {
    try {
        const token = socket.handshake.auth.token;
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        socket.data.user = user;
        next();
    }
    catch {
        next(new Error("Unauthorized"));
    }
}
