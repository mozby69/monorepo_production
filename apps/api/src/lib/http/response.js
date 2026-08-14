"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
function sendSuccess(res, data, options = {}) {
    const response = {
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
