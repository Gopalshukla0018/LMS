import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isSuperAdmin from "../middlewares/isSuperAdmin.js";
import { getSuperAdminDashboardStats } from ".././controllers/superAdmin.controller.js"; 

const router = express.Router();

router
  .route("/dashboard")
  .get(isAuthenticated, getSuperAdminDashboardStats);
//  isSuperAdmin,
export default router;
