import express, { Router } from "express";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import { getAdminDashboardData } from "../../controllers/admin/admin.controller.js";

const router = express(Router());

router.route("/dashboard").get(isAuthenticated, getAdminDashboardData);

export default router;
