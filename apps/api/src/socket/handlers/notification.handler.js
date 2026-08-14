"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationHandler = notificationHandler;
function notificationHandler(io, socket) {
    socket.on("notification:read", (id) => {
        // update database
        io.emit("notification:updated", id);
    });
}
