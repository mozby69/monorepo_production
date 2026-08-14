"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
const isProduction = process.env.NODE_ENV === "production";
exports.authConfig = {
    accessTokenCookie: "access_token",
    refreshTokenCookie: "refresh_token",
    accessTokenCookieMaxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    refreshTokenCookieMaxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    cookieOptions: {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
    },
};
