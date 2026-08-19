import type { Request, Response, NextFunction } from "express";

import { sendSuccess } from "@/lib/http/response";
import * as service from "./access-control.service";

export async function getUsersController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const result = await service.getUsers({
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,

            search:
                typeof req.query.search === "string"
                    ? req.query.search.trim()
                    : undefined,

            role:
                typeof req.query.role === "string"
                    ? req.query.role
                    : undefined,

            status:
                typeof req.query.status === "string"
                    ? req.query.status
                    : undefined,

            sort:
                typeof req.query.sort === "string"
                    ? req.query.sort
                    : undefined,
        });

        sendSuccess(res, result.data, {
            pagination: result.pagination,
        });
    } catch (error) {
        next(error);
    }
}


export async function createUserController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result = await service.createUser(req.body);

        sendSuccess(res, result, {
            statusCode: 201,
            message: "User created successfully",
        });
    } catch (error) {
        next(error);
    }
}

export async function updateUserController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result = await service.updateUser(
            Number(req.params.userId),
            req.body
        );

        sendSuccess(res, result, {
            statusCode: 200,
            message: "User updated successfully",
        });
    } catch (error) {
        next(error);
    }
}

export async function getRolesController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const roles = await service.getRoles();

        sendSuccess(res, roles, {
            statusCode: 200,
            message: "User updated successfully",
        });
    } catch (error) {
        next(error);
    }
}

export async function createRoleController(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {
        const role = await service.createRole(
            req.body
        );

        sendSuccess(res, role, {
            statusCode: 201,
            message: "Role created successfully",
        });
    } catch (error) {
        next(error);
    }
}

export async function updateRoleController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const role = await service.updateRole(
            Number(req.params.roleId),
            req.body
        );

        sendSuccess(res, role, {
            statusCode: 200,
            message: "Role updated successfully",
        });
    } catch (error) {
        next(error);
    }
}

export async function getPermissionsController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const permissions = await service.getPermissions();

        sendSuccess(res, permissions, {
            statusCode: 200,
            message: "Role updated successfully",
        });
    } catch (error) {
        next(error);
    }
}

export async function updateRolePermissionsController(
    req: Request,
    res: Response,
    next: NextFunction
) {

    try {
        const result =
            await service.updateRolePermissions(
                Number(req.params.roleId),
                req.body.permissionIds
            );

        sendSuccess(res, result, {
            statusCode: 200,
            message: "Role updated successfully",
        });
    } catch (error) {
        next(error);
    }
}