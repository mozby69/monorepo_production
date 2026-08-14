"use client";

import { createContext } from "react";
import type { AuthenticatedUser } from "@repo/shared";

export interface AuthContextType {
    user: AuthenticatedUser | null;
    isAuthenticated: boolean;
    isAuthReady: boolean;
    login: (user: AuthenticatedUser) => void;
    logout: () => void;
    hasRole: (role: string) => boolean;
    hasPermission: (permission: string) => boolean;
    refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);