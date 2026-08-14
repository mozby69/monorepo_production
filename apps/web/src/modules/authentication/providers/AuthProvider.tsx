"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { AuthenticatedUser } from "@repo/shared";

import { AuthContext } from "../context/AuthContext";
import { Authme, LogoutService } from "../services/auth.service";

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const [user, setUser] = useState<AuthenticatedUser | null>(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    const isAuthenticated = !!user;

    const refreshUser = useCallback(async () => {
        try {
            const response = await Authme();

            setUser(response.data);
        } catch {
            setUser(null);
        } finally {
            setIsAuthReady(true);
        }
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    const login = useCallback(
        (user: AuthenticatedUser) => {
            setUser(user);
            setIsAuthReady(true);

            const isAdmin = user.roles.some(
                (role) => role.toUpperCase() === "ADMIN"
            );

            if (isAdmin) {
                router.replace("/admin/access-control");
                return;
            }

            router.replace("/");
        },
        [router]
    );

    const logout = useCallback(async () => {
        try {
            await LogoutService();
        } catch (error) {
            console.error(error);
        } finally {
            setUser(null);
            setIsAuthReady(true);
            router.replace("/login");
        }
    }, [router]);

    const hasRole = useCallback(
        (role: string) =>
            user?.roles.some(
                (userRole) =>
                    userRole.toUpperCase() === role.toUpperCase()
            ) ?? false,
        [user]
    );

    const hasPermission = useCallback(
        (permission: string) =>
            user?.permissions.includes(permission) ?? false,
        [user]
    );

    const value = useMemo(
        () => ({
            user,
            isAuthenticated,
            isAuthReady,
            login,
            logout,
            hasRole,
            refreshUser,
            hasPermission,
        }),
        [
            user,
            isAuthenticated,
            isAuthReady,
            login,
            logout,
            hasRole,
            refreshUser,
            hasPermission,
        ]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}