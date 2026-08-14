// app/loading.tsx

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div
                    className="
                        mx-auto
                        h-10
                        w-10
                        animate-spin
                        rounded-full
                        border-4
                        border-gray-200
                        border-t-blue-600
                    "
                />

                <h1 className="mt-4 text-xl font-semibold text-gray-800">
                    Loading
                </h1>

                <p className="mt-2 text-gray-600">
                    Please wait while we prepare the page.
                </p>
            </div>
        </div>
    );
}