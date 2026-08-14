"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_middleware_1 = require("@/middleware/authenticate.middleware");
const authorize_middleware_1 = require("@/middleware/authorize.middleware");
const dashboard_controller_1 = require("./dashboard.controller");
const router = (0, express_1.Router)();
router.use(authenticate_middleware_1.authenticate);
router.get("/", (0, authorize_middleware_1.authorize)({
    roles: ["ADMIN"],
}), dashboard_controller_1.getDashboardController);
exports.default = router;
