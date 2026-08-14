"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRolePermissionsRequestSchema = exports.updateRoleRequestSchema = exports.createRoleRequestSchema = exports.updateUserRequestSchema = exports.createUserRequestSchema = void 0;
const zod_1 = require("zod");
const shared_1 = require("@repo/shared");
/* =====================
   USER REQUEST SCHEMAS
===================== */
exports.createUserRequestSchema = zod_1.z.object({
    body: shared_1.createUserSchema,
});
exports.updateUserRequestSchema = zod_1.z.object({
    params: zod_1.z.object({
        userId: zod_1.z.coerce.number().int().positive(),
    }),
    body: shared_1.updateUserSchema,
});
/* =====================
   ROLE REQUEST SCHEMAS
===================== */
exports.createRoleRequestSchema = zod_1.z.object({
    body: shared_1.createRoleSchema,
});
exports.updateRoleRequestSchema = zod_1.z.object({
    params: zod_1.z.object({
        roleId: zod_1.z.coerce.number().int().positive(),
    }),
    body: shared_1.updateRoleSchema,
});
/* =====================
   ROLE PERMISSION REQUEST SCHEMAS
===================== */
exports.updateRolePermissionsRequestSchema = zod_1.z.object({
    params: zod_1.z.object({
        roleId: zod_1.z.coerce.number().int().positive(),
    }),
    body: shared_1.updateRolePermissionsSchema,
});
