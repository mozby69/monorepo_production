import { Server, Socket } from "socket.io";

export function notificationHandler(
    io: Server,
    socket: Socket
) {
    socket.on("notification:read", (id) => {
        // update database

        io.emit("notification:updated", id);
    });
}