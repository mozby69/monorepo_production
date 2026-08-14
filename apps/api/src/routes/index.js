"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const access_control_routes_1 = __importDefault(require("@/modules/admin/access-control/access-control.routes"));
const dashboard_routes_1 = __importDefault(require("@/modules/admin/dashboard/dashboard.routes"));
const authenticate_middleware_1 = require("@/middleware/authenticate.middleware");
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default);
router.use("/admin/access-control", authenticate_middleware_1.authenticate, access_control_routes_1.default);
router.use("/admin/dashboard", authenticate_middleware_1.authenticate, dashboard_routes_1.default);
exports.default = router;
