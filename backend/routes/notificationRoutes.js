import express from "express";
import { GetAllNotifications, SendNotification } from "../controllers/DashboardControllers/NotifactionConroller.js";

const router = express.Router();


router.post("/notifaction", SendNotification)
router.get("/", GetAllNotifications)

export default router;
