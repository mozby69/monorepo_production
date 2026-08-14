import { useAuth } from "./useAuth";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/auth.service";
import { LoginSchema } from "@repo/shared";

export const useLogin = () => {
    const { login } = useAuth();

    return useMutation({
        mutationFn: (params: LoginSchema) => loginService(params),

        onSuccess: (LoginResponse) => {
            const user = LoginResponse.data;

            login({
                ...user,
                roles: user.roles.map((role) => role.name),
                permissions: user.permissions.map(
                    (permission) => permission.code
                ),
            });
        },

    });
};