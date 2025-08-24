import express from "express";
import { getPrivateMessages, getPublicMessages, getUsersWithMessages } from "../controllers/messageController.js";

const router = express.Router();

// Public messages
router.get("/public", getPublicMessages);
router.get("/private/:fromUser/:toUser", getPrivateMessages);
router.get("/getUsersWithMessages/:username", getUsersWithMessages);



export default router;
