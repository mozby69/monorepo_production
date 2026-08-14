import jwt from "jsonwebtoken";

import { env } from "@/config/env";
import { jwtConfig } from "@/config/jwt.config";
import type { JwtPayload } from "@/modules/auth/auth.types";

/**
 * Generate an access token.
 */
export function generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: jwtConfig.accessTokenExpiresIn,
    });
}

/**
 * Verify and decode an access token.
 */
export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}

/**
 * Decode a token without verifying its signature.
 */
export function decodeToken(token: string): JwtPayload | null {
    return jwt.decode(token) as JwtPayload | null;
}