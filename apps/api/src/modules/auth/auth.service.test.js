"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const auth_service_1 = require("./auth.service");
const authRepository = __importStar(require("./auth.repository"));
const password_service_1 = require("./internal/password.service");
const token_service_1 = require("./internal/token.service");
const auth_mapper_1 = require("./auth.mapper");
const error_codes_1 = require("@/errors/error-codes");
vitest_1.vi.mock("./auth.repository");
vitest_1.vi.mock("./internal/password.service", () => ({
    verifyPassword: vitest_1.vi.fn(),
}));
vitest_1.vi.mock("./internal/token.service", () => ({
    generateAccessToken: vitest_1.vi.fn(),
}));
vitest_1.vi.mock("./auth.mapper", () => ({
    mapAuthenticatedUser: vitest_1.vi.fn(),
}));
(0, vitest_1.describe)("loginUser", () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)("should throw INVALID_CREDENTIALS when user does not exist", async () => {
        vitest_1.vi.mocked(authRepository.findByUsernameWithRoles).mockResolvedValue(null);
        await (0, vitest_1.expect)((0, auth_service_1.loginUser)({
            username: "john",
            password: "Password123!",
        })).rejects.toMatchObject({
            statusCode: 401,
            code: error_codes_1.ErrorCodes.INVALID_CREDENTIALS,
            message: "Invalid username or password",
        });
        (0, vitest_1.expect)(authRepository.findByUsernameWithRoles).toHaveBeenCalledWith("john");
        (0, vitest_1.expect)(password_service_1.verifyPassword).not.toHaveBeenCalled();
        (0, vitest_1.expect)(auth_mapper_1.mapAuthenticatedUser).not.toHaveBeenCalled();
        (0, vitest_1.expect)(token_service_1.generateAccessToken).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)("should throw INVALID_CREDENTIALS when user is inactive", async () => {
        vitest_1.vi.mocked(authRepository.findByUsernameWithRoles).mockResolvedValue({
            id: 1,
            name: "John Doe",
            username: "john",
            password: "hashed-password",
            isActive: false,
            roles: [],
        });
        await (0, vitest_1.expect)((0, auth_service_1.loginUser)({
            username: "john",
            password: "Password123!",
        })).rejects.toMatchObject({
            statusCode: 401,
            code: error_codes_1.ErrorCodes.INVALID_CREDENTIALS,
            message: "Invalid username or password",
        });
        (0, vitest_1.expect)(password_service_1.verifyPassword).not.toHaveBeenCalled();
        (0, vitest_1.expect)(auth_mapper_1.mapAuthenticatedUser).not.toHaveBeenCalled();
        (0, vitest_1.expect)(token_service_1.generateAccessToken).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)("should throw INVALID_CREDENTIALS when password is invalid", async () => {
        const user = {
            id: 1,
            name: "John Doe",
            username: "john",
            password: "hashed-password",
            isActive: true,
            roles: [],
        };
        vitest_1.vi.mocked(authRepository.findByUsernameWithRoles).mockResolvedValue(user);
        vitest_1.vi.mocked(password_service_1.verifyPassword).mockResolvedValue(false);
        await (0, vitest_1.expect)((0, auth_service_1.loginUser)({
            username: "john",
            password: "wrong-password",
        })).rejects.toMatchObject({
            statusCode: 401,
            code: error_codes_1.ErrorCodes.INVALID_CREDENTIALS,
            message: "Invalid username or password",
        });
        (0, vitest_1.expect)(password_service_1.verifyPassword).toHaveBeenCalledWith("wrong-password", "hashed-password");
        (0, vitest_1.expect)(auth_mapper_1.mapAuthenticatedUser).not.toHaveBeenCalled();
        (0, vitest_1.expect)(token_service_1.generateAccessToken).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)("should return token and authenticated user when credentials are valid", async () => {
        const user = {
            id: 1,
            name: "John Doe",
            username: "john",
            password: "hashed-password",
            isActive: true,
            roles: [
                {
                    role: {
                        name: "ADMIN",
                        permissions: [
                            {
                                permission: {
                                    code: "users.read",
                                },
                            },
                        ],
                    },
                },
            ],
        };
        const authenticatedUser = {
            id: 1,
            name: "John Doe",
            username: "john",
            roles: ["ADMIN"],
            permissions: ["users.read"],
        };
        vitest_1.vi.mocked(authRepository.findByUsernameWithRoles).mockResolvedValue(user);
        vitest_1.vi.mocked(password_service_1.verifyPassword).mockResolvedValue(true);
        vitest_1.vi.mocked(auth_mapper_1.mapAuthenticatedUser).mockReturnValue(authenticatedUser);
        vitest_1.vi.mocked(token_service_1.generateAccessToken).mockReturnValue("mock-access-token");
        const result = await (0, auth_service_1.loginUser)({
            username: "john",
            password: "Password123!",
        });
        (0, vitest_1.expect)(authRepository.findByUsernameWithRoles).toHaveBeenCalledWith("john");
        (0, vitest_1.expect)(password_service_1.verifyPassword).toHaveBeenCalledWith("Password123!", "hashed-password");
        (0, vitest_1.expect)(auth_mapper_1.mapAuthenticatedUser).toHaveBeenCalledWith(user);
        (0, vitest_1.expect)(token_service_1.generateAccessToken).toHaveBeenCalledWith({
            id: 1,
            username: "john",
            roles: ["ADMIN"],
            permissions: ["users.read"],
        });
        (0, vitest_1.expect)(result).toEqual({
            token: "mock-access-token",
            user: authenticatedUser,
        });
    });
});
