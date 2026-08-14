"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginSchema } from "@repo/shared";
import { useLogin } from "../hooks/useLogin";
import SweetAlert from "@/lib/alerts/alert";

export default function LoginForm() {
    const {
        mutateAsync: login,
        isPending,
    } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(data: LoginSchema) {

        try {
            await login(data);
            SweetAlert.successAlert(
                "Success",
                "Login successful"
            );
        } catch (error) {
            SweetAlert.errorAlert(
                "Error",
                "Invalid credentials"
            );
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
        >
            <div className="space-y-2">
                <label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700"
                >
                    Username
                </label>

                <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    disabled={isPending}
                    {...register("username")}
                    className="
                        h-11
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        text-black
                        px-3
                        text-sm
                        outline-none
                        transition
                        focus:border-gray-500
                        focus:ring-2
                        focus:ring-gray-200
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                />

                {errors.username && (
                    <p className="text-sm text-red-600">
                        {errors.username.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                >
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    disabled={isPending}
                    {...register("password")}
                    className="
                        h-11
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        text-black
                        px-3
                        text-sm
                        outline-none
                        transition
                        focus:border-gray-500
                        focus:ring-2
                        focus:ring-gray-200
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                />

                {errors.password && (
                    <p className="text-sm text-red-600">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="
                    h-11
                    w-full
                    rounded-lg
                    bg-gray-900
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-gray-800
                    disabled:cursor-not-allowed
                    disabled:opacity-60
        "
            >
                {isPending ? "Signing in..." : "Sign in"}
            </button>
        </form>
    );
}