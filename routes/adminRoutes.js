// routes/adminRoutes.js
import express from "express";
import { getAdminDashboardStats } from "../controller/adminController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/stats", verifyToken,getAdminDashboardStats);

export default router;
