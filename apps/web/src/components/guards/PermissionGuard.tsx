"use client";

import { useAuth } from "@/modules/authentication/hooks/useAuth";

interface PermissionGuardProps {
    permissions: string[];
    requireAll?: boolean;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export default function PermissionGuard({
    permissions,
    requireAll = false,
    children,
    fallback = null,
}: PermissionGuardProps) {
    const { hasPermission } = useAuth();

    const isAllowed = requireAll
        ? permissions.every((permission) =>
            hasPermission(permission)
        )
        : permissions.some((permission) =>
            hasPermission(permission)
        );

    if (!isAllowed) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}