"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// router.get(
//   "/users",
//   authenticate,
//   authorize({
//     roles: ["ADMIN"],
//   }),
//   getUsersController
// );
// router.delete(
//   "/users/:id",
//   authenticate,
//   authorize({
//     roles: ["ADMIN"],
//     permissions: ["users.delete"],
//   }),
//   deleteUserController
// );
exports.default = router;
