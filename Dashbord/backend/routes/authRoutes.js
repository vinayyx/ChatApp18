import express from "express";
import { guestLogin, signup, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/guest-login", guestLogin);
router.post("/signup", signup);
router.post("/login", login);

export default router;
