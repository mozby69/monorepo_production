import { Router } from "express";

import { authenticate } from "@/middleware/authenticate.middleware";
import { authorize } from "@/middleware/authorize.middleware";

import { getDashboardController, } from "./dashboard.controller";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    authorize({
        roles: ["ADMIN"],
    }),
    getDashboardController
);

export default router;