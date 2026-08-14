"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatHandler = chatHandler;
function chatHandler(io, socket) {
    socket.on("chat:send", (message) => {
        io.emit("chat:new", message);
    });
}
