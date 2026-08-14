import LoginForm from "../components/LoginForm";

export default function LoginView() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            WorkSpace
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Sign in to continue
                        </p>
                    </div>

                    <LoginForm />
                </div>

                <p className="mt-6 text-center text-xs text-gray-400">
                    WorkSpace
                </p>
            </div>
        </main>
    );
}