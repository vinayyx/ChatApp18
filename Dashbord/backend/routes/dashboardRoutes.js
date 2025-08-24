import express from "express";
import { getAllUsers, getUserById, toggleBanUser, getUserReports, getAllReports } from "../controllers/DashboardControllers/DashboardControllers.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id/ban", toggleBanUser);
router.get("/users/:id/reports", getUserReports);
router.get("/reports", getAllReports);

export default router;
