import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    Info,
} from "lucide-react";

import type { ToastStyleMap } from "./toast.types";

export const toastIcons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
} as const;

export const toastStyles: ToastStyleMap = {
    success: "bg-emerald-600 text-white",
    error: "bg-rose-600 text-white",
    warning: "bg-amber-500 text-white",
    info: "bg-sky-600 text-white",
};