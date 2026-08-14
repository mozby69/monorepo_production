"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = verifyPassword;
exports.hashPassword = hashPassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
function verifyPassword(plainPassword, passwordHash) {
    return bcrypt_1.default.compare(plainPassword, passwordHash);
}
function hashPassword(password) {
    return bcrypt_1.default.hash(password, 12);
}
