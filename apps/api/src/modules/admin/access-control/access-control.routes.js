"use strict";
// access-control.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const access_control_controller_1 = require("./access-control.controller");
const authenticate_middleware_1 = require("@/middleware/authenticate.middleware");
const authorize_middleware_1 = require("@/middleware/authorize.middleware");
const validate_middleware_1 = require("@/middleware/validate.middleware");
const access_control_schema_1 = require("./access-control.schema");
const router = (0, express_1.Router)();
/* =====================
   AUTHENTICATION
===================== */
router.use(authenticate_middleware_1.authenticate);
/* =====================
   USERS
===================== */
router.get("/users", (0, authorize_middleware_1.authorize)({
    roles: ["ADMIN"],
    permissions: ["users.read", "ADMIN_MANAGE"],
}), access_control_controller_1.getUsersController);
router.post("/users", (0, authorize_middleware_1.authorize)({
    roles: ["ADMIN"],
    permissions: ["users.create", "ADMIN_MANAGE"],
}), (0, validate_middleware_1.validate)(access_control_schema_1.createUserRequestSchema), access_control_controller_1.createUserController);
router.patch("/users/:userId", (0, authorize_middleware_1.authorize)({
    roles: ["ADMIN"],
    permissions: ["users.update", "ADMIN_MANAGE"],
}), (0, validate_middleware_1.validate)(access_control_schema_1.updateUserRequestSchema), access_control_controller_1.updateUserController);
/* =====================
   ROLES
===================== */
router.get("/roles", (0, authorize_middleware_1.authorize)({
    roles: ["ADMIN"],
    permissions: ["roles.read", "ADMIN_MANAGE"],
}), access_control_controller_1.getRolesController);
router.post("/roles", (0, authorize_middleware_1.authorize)({
    roles: ["ADMIN"],
    permissions: ["roles.create", "ADMIN_MANAGE"],
}), (0, validate_middleware_1.validate)(access_control_schema_1.createRoleRequestSchema), access_control_controller_1.createRoleController);
router.patch("/roles/:roleId", (0, authorize_middleware_1.authorize)({
    roles: ["ADMIN"],
    permissions: ["roles.update", "ADMIN_MANAGE"],
}), (0, validate_middleware_1.validate)(access_control_schema_1.updateRoleRequestSchema), access_control_controller_1.updateRoleController);
/* =====================
   PERMISSIONS
===================== */
router.get("/permissions", (0, authorize_middleware_1.authorize)({
    roles: ["ADMIN"],
    permissions: ["permissions.read", "ADMIN_MANAGE"],
}), access_control_controller_1.getPermissionsController);
router.put("/roles/:roleId/permissions", (0, authorize_middleware_1.authorize)({
    roles: ["ADMIN"],
    permissions: ["permissions.assign", "ADMIN_MANAGE"],
}), (0, validate_middleware_1.validate)(access_control_schema_1.updateRolePermissionsRequestSchema), access_control_controller_1.updateRolePermissionsController);
exports.default = router;
