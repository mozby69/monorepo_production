"use client";

import { useAuth } from "@/modules/authentication/hooks/useAuth";

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="flex h-16 items-center justify-between border-b bg-gray-700 px-6">
            {/* Left */}
            <div>
                <h1 className="text-lg font-semibold text-gray-100">
                    Monorepo WorkSpace
                </h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                {user && (
                    <div className="text-right">
                        <p className="text-sm font-medium text-gray-800">
                            {user.name}
                        </p>

                        <p className="text-xs text-gray-500">
                            {user.username}
                        </p>
                    </div>
                )}

                <button
                    type="button"
                    onClick={logout}
                    className="
                        rounded-md
                        border
                        border-gray-300
                        px-3
                        py-2
                        text-sm
                        font-medium
                        text-gray-700
                        transition
                        hover:bg-gray-100
                    "
                >
                    Logout
                </button>
            </div>
        </header>
    );
}