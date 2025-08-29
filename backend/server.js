import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http"; // <- for socket.io
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { initSocket } from "./socket.js"; // <- your socket file
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import reportRoutes from "./routes/reportRoutes.js"
import dashboard from "./routes/dashboardRoutes.js"
import allchatRoutes from "./routes/allchatRoutes.js";
import allNotification from "./routes/notificationRoutes.js"






dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // <- HTTP server for socket.io







app.use(cors({
  origin: [process.env.FRONTEND_URL , process.env.FRONTEND_URL2 ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.set("trust proxy", true);


// Routes
app.get("/", (req, res) => {
    res.send("Server is live");
});
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api", chatRoutes);
app.use("/api", reportRoutes)
app.use("/db",  dashboard )
app.use("/api/chats", allchatRoutes);
app.use("/api", allNotification  )








// ========================
// Socket.IO setup
// ========================
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Initialize your socket logic
initSocket(io);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
