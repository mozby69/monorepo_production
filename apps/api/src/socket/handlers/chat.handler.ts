import { Server, Socket } from "socket.io";

export function chatHandler(
    io: Server,
    socket: Socket
) {
    socket.on("chat:send", (message) => {
        io.emit("chat:new", message);
    });
}