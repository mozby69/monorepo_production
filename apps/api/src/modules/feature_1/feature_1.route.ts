import { Router } from "express";

const router = Router();

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

export default router;