import express from "express";
import { getUserChats } from "../controllers/allchatconroller.js";

const router = express.Router();

// Get all chats with a specific user
router.get("/:userId", getUserChats);

export default router;
