"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.verifyToken = verifyToken;
exports.decodeToken = decodeToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("@/config/env");
const jwt_config_1 = require("@/config/jwt.config");
/**
 * Generate an access token.
 */
function generateAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, env_1.env.JWT_SECRET, {
        expiresIn: jwt_config_1.jwtConfig.accessTokenExpiresIn,
    });
}
/**
 * Verify and decode an access token.
 */
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, env_1.env.JWT_SECRET);
}
/**
 * Decode a token without verifying its signature.
 */
function decodeToken(token) {
    return jsonwebtoken_1.default.decode(token);
}
