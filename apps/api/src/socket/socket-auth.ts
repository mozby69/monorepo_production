import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

export function authenticateSocket(socket: Socket, next: Function) {
    try {
        const token = socket.handshake.auth.token;

        const user = jwt.verify(token, process.env.JWT_SECRET!);

        socket.data.user = user;

        next();
    } catch {
        next(new Error("Unauthorized"));
    }
}