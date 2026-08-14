import * as authRepository from "./auth.repository";
import { AppError } from "@/errors/app-error";
import { ErrorCodes } from "@/errors/error-codes";
import bcrypt from "bcrypt";
import { LoginDTO } from "./auth.types";
import { generateAccessToken } from "./internal/token.service";
import { verifyPassword, } from "./internal/password.service";
import { mapAuthenticatedUser } from "./auth.mapper";
import { RegisterUserSchema, UpdateUserSchema } from "@repo/shared";

export const getAuthenticatedUser = async (userId: number) => {
    const user = await authRepository.findByIdWithRoles(userId);

    if (!user) {
        throw new AppError(
            "User not found",
            404,
            ErrorCodes.USER_NOT_FOUND
        );
    }

    return mapAuthenticatedUser(user);
}

export async function loginUser(params: LoginDTO) {
    const { username, password } = params;

    const user = await authRepository.findByUsernameWithRoles(username);

    if (!user || !user.isActive) {
        throw new AppError(
            "Invalid username or password",
            401,
            ErrorCodes.INVALID_CREDENTIALS
        );
    }

    const isPasswordValid = await verifyPassword(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new AppError(
            "Invalid username or password",
            401,
            ErrorCodes.INVALID_CREDENTIALS
        );
    }

    const authenticatedUser =
        mapAuthenticatedUser(user);

    const token = generateAccessToken({
        id: user.id,
        username: user.username,
        roles: authenticatedUser.roles,
        permissions: authenticatedUser.permissions
    });

    return {
        token,
        user: authenticatedUser
    };
}


export async function createUserService(data: RegisterUserSchema) {
    const {
        email,
        name,
        username,
        password,
    } = data;

    // Check if username/email already exists
    const existingUser = await authRepository.findExistingUser({
        username,
        email,
    });

    if (existingUser) {
        throw new AppError(
            "User already exists",
            400,
            ErrorCodes.USER_ALREADY_EXISTS,
        );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user + roles in a transaction
    const user = await authRepository.createUserWithRoles({
        email,
        name,
        username,
        password: hashedPassword
    });

    // Never expose password
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        isActive: user.isActive,
        createdAt: user.createdAt,
    };
}

export async function updateUserService(
    userId: number,
    data: UpdateUserSchema
) {
    // Check if user exists
    const existingUser = await authRepository.findById(userId);

    if (!existingUser) {
        throw new AppError(
            "User not found",
            404,
            ErrorCodes.USER_NOT_FOUND
        );
    }

    // Check username/email conflicts
    const duplicateUser = await authRepository.findDuplicateUser({
        userId,
        username: data.username,
        email: data.email,
    });

    if (duplicateUser) {
        throw new AppError(
            "Username or email already exists",
            400,
            ErrorCodes.USER_ALREADY_EXISTS
        );
    }

    // Validate roles if provided
    if (data.roleIds) {
        const roles = await authRepository.findRolesByIds(data.roleIds);

        if (roles.length !== data.roleIds.length) {
            throw new AppError(
                "Invalid role selected",
                400,
                ErrorCodes.INVALID_ROLE
            );
        }
    }

    // Hash password only when provided
    let hashedPassword: string | undefined;

    if (data.password) {
        hashedPassword = await bcrypt.hash(data.password, 12);
    }

    // Update user + roles
    const user = await authRepository.updateUserWithRoles(
        userId,
        {
            email: data.email,
            name: data.name,
            username: data.username,
            password: hashedPassword,
            roleIds: data.roleIds,
            isActive: data.isActive,
        }
    );

    // Never return password
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        isActive: user.isActive,
        createdAt: user.createdAt,
    };
}


export async function getRoleService() {
    const roles = await authRepository.findAllRoles();

    return roles.map((role) => ({
        id: role.id,
        name: role.name,
        description: role.description,
        permissions: role.permissions.map(
            (item) => item.permission.code
        ),
    }));
}

// permission.service.ts

export async function getPermissionService() {
    return authRepository.findAllPermissions();
}


export async function getUsersService() {
    return authRepository.findAllUsers();
}

export async function updateRolePermissionsService(
    roleId: number,
    permissionIds: number[]
) {
    // business rules here

    const role = await authRepository.findById(roleId);

    if (!role) {
        throw new AppError(
            "Role not found",
            404,
            ErrorCodes.ROLE_NOT_FOUND
        );
    }

    // validate permissions, etc.

    return authRepository.updatePermissions(
        roleId,
        permissionIds
    );
}


