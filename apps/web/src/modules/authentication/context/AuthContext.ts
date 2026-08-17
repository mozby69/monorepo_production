"use client";

import { createContext } from "react";
import type { AuthenticatedUser, RoleName, PermissionName } from "@repo/shared";

export interface AuthContextType {
    user: AuthenticatedUser | null;
    isAuthenticated: boolean;
    isAuthReady: boolean;
    login: (user: AuthenticatedUser) => void;
    logout: () => void;
    hasRole: (role: RoleName) => boolean;
    hasPermission: (permission: PermissionName) => boolean;
    refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);