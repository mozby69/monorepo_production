import type { Response } from "express";

import type {
    ApiResponse,
    PaginationMeta,
} from "@repo/shared";

type SuccessOptions = {
    statusCode?: number;
    message?: string;
    pagination?: PaginationMeta;
};

export function sendSuccess<T>(
    res: Response,
    data: T,
    options: SuccessOptions = {}
) {
    const response: ApiResponse<T> = {
        success: true,
        data,

        ...(options.message && {
            message: options.message,
        }),

        ...(options.pagination && {
            pagination: options.pagination,
        }),
    };

    return res
        .status(options.statusCode ?? 200)
        .json(response);
}