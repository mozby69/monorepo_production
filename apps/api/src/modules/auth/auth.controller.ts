import type { Request, Response, NextFunction } from "express";

import { authConfig } from "@/config/auth.config";
import { sendSuccess } from "@/lib/http/response";
import * as service from "./auth.service";
import type { LoginDTO } from "./auth.types";
import { createUserSchema, updateRolePermissionsSchema, updateUserSchema } from "@repo/shared";

import { AppError } from "@/errors/app-error";
import { ErrorCodes } from "@/errors/error-codes";

export async function me(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await service.getAuthenticatedUser(req.user!.id);

    return sendSuccess(res, user);
  } catch (error) {
    next(error);
  }
}

export async function loginController(
  req: Request<{}, {}, LoginDTO>,
  res: Response,
  next: NextFunction
) {
  try {
    const { token, user } = await service.loginUser(req.body);

    res.cookie(
      authConfig.accessTokenCookie,
      token,
      {
        ...authConfig.cookieOptions,
        maxAge: authConfig.accessTokenCookieMaxAge,
      }
    );

    return sendSuccess(res, user, {
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.clearCookie(
      authConfig.accessTokenCookie,
      authConfig.cookieOptions
    );

    return sendSuccess(res, null, {
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
}

export async function createUserController(req: Request, res: Response, next: NextFunction
) {
  try {
    const parsed = createUserSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new AppError(
        "Validation failed",
        400,
        ErrorCodes.VALIDATION_ERROR,
      );
    }

    const user = await service.createUserService(parsed.data);

    return sendSuccess(
      res, user,
      {
        statusCode: 201,
        message: "User created successfully",
      }
    );
  } catch (error) {
    next(error);
  }
}

export async function updateUserController(req: Request, res: Response, next: NextFunction) {
  const userId = Number(req.params.id)

  try {

    const userId = Number(req.params.id);

    if (Number.isNaN(userId)) {
      throw new AppError(
        "Invalid user ID",
        400,
        ErrorCodes.VALIDATION_ERROR);
    }

    const parsed = updateUserSchema.safeParse(req.body)

    if (!parsed.success) {
      throw new AppError(
        "Validation failed",
        400,
        ErrorCodes.VALIDATION_ERROR,
      );
    }

    const user = await service.updateUserService(userId, parsed.data)

    return sendSuccess(res, user, {
      statusCode: 400,
      message: "User succesfully updated",
    })
  } catch (error) {
    next(error);
  }
}

export async function getRoleController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const roles = await service.getRoleService();

    return sendSuccess(res, roles, {
      message: "Roles fetched successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function getPermissionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const permission = await service.getPermissionService()

    return sendSuccess(res, permission, {
      message: "Permission fetched successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function getUsersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await service.getUsersService()
    return sendSuccess(res, users, {
      message: "User fetched successfully",
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
    const roleId = Number(req.params.id);

    if (Number.isNaN(roleId)) {
      throw new AppError(
        "Invalid role ID",
        400,
        ErrorCodes.VALIDATION_ERROR
      );
    }

    const parsed = updateRolePermissionsSchema.safeParse(req.body);

    if (!parsed.success) {
      throw new AppError(
        "Validation failed",
        400,
        ErrorCodes.VALIDATION_ERROR
      );
    }

    await service.updateRolePermissionsService(
      roleId,
      parsed.data.permissionIds
    );

    return sendSuccess(res, null, {
      message: "Permissions updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

