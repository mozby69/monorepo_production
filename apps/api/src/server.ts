import dotenv from "dotenv";
import http from "http";
import app from "./app";
import { initializeSocket } from "./config/socket.config";
import { logger } from "@/lib/logger/logger";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

const server = http.createServer(app);

// ---------------------------
// Socket.io
// ---------------------------
export const io = initializeSocket(server);

// ---------------------------
// Start Server (LAN Ready)
// ---------------------------
logger.info("Server started");

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});