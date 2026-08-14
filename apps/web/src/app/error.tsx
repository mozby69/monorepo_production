// app/error.tsx

"use client";

import { useEffect } from "react";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-red-600">
                    Something Went Wrong
                </h1>

                <p className="mt-2 text-gray-600">
                    An unexpected error occurred while loading this page.
                </p>

                <button
                    type="button"
                    onClick={reset}
                    className="
                        mt-6
                        rounded-md
                        bg-blue-600
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-white
                        hover:bg-blue-700
                    "
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}