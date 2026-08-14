export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastOptions {
    duration?: number;
    entity?: string;
    entityId?: number;
}

export interface ConfirmOptions {
    confirmText?: string;
    cancelText?: string;
}

export interface ToastStyleMap {
    [key: string]: string;
}