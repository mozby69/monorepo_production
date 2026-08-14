import { Server } from "socket.io";
import { chatHandler } from "./handlers/chat.handler";
import { notificationHandler } from "./handlers/notification.handler";

export function registerSocketHandlers(io: Server) {
    io.on("connection", (socket) => {

        notificationHandler(io, socket);

        chatHandler(io, socket);

        socket.on("disconnect", () => {
            console.log("Disconnected");
        });

    });
}