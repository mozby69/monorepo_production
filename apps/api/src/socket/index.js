"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSocketHandlers = registerSocketHandlers;
const chat_handler_1 = require("./handlers/chat.handler");
const notification_handler_1 = require("./handlers/notification.handler");
function registerSocketHandlers(io) {
    io.on("connection", (socket) => {
        (0, notification_handler_1.notificationHandler)(io, socket);
        (0, chat_handler_1.chatHandler)(io, socket);
        socket.on("disconnect", () => {
            console.log("Disconnected");
        });
    });
}
