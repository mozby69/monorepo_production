"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const token_service_1 = require("@/modules/auth/internal/token.service");
const auth_config_1 = require("@/config/auth.config");
const auth_service_1 = require("@/modules/auth/auth.service");
async function authenticate(req, res, next) {
    try {
        const token = req.cookies?.[auth_config_1.authConfig.accessTokenCookie];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const payload = (0, token_service_1.verifyToken)(token);
        req.user = await (0, auth_service_1.getAuthenticatedUser)(payload.id);
        return next();
    }
    catch {
        return res.status(401).json({
            success: false,
            message: "Authentication failed",
        });
    }
}
;
