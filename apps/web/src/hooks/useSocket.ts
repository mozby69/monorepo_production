"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createSocket } from "@/lib/socket/socket-client";
import { AppToast } from "@/lib/toast";

type EntityType = "request" | "consultation" | "lab" | "billing" | "admin";

type NotificationData = {
    type: "NEW_REQUEST" | "APPROVED" | "REJECTED" | "SYSTEM";
    title: string;
    message: string;
    entity?: EntityType;
    entity_id?: number;
    is_read?: boolean;
};

type NotificationHandler = (data: NotificationData) => void;

const ENTITY_QUERY_MAP: Record<EntityType, ReadonlyArray<readonly string[]>> = {
    request: [["lab"], ["billing"], ["dashboard"]], //["queue"],["request"], ["labRequests"]
    consultation: [["consultation"], ["consultation", "list"], ["queue"], ["dashboard"]],
    lab: [["lab"], ["laboratory"], ["billing"], ["request"], ["queue"], ["dashboard"]],
    billing: [["billing"], ["dashboard"]],
    admin: [["users"], ["services"], ["billing"], ["request"], ["queue"], ["dashboard"]],
};

export default function useSocket(onNotification?: NotificationHandler) {
    const queryClient = useQueryClient();

    useEffect(() => {
        const socket = createSocket();

        socket.connect();

        const invalidateKeys = (keys: ReadonlyArray<readonly string[]>) => {
            keys.forEach((key) => {
                queryClient.invalidateQueries({ queryKey: key });
            });
        };

        const handleNotification = (data: NotificationData) => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });

            if (data.entity) {
                invalidateKeys(ENTITY_QUERY_MAP[data.entity]);
            }

            if (typeof data.message === "string") {
                AppToast.success(data.message);
            }

            onNotification?.(data);
        };

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("connect_error", (err) => {
            console.log("Socket error:", err.message);
        });

        return () => {

            socket.disconnect();
        };
    }, [queryClient, onNotification]);
}