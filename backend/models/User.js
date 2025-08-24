// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  isGuest: { type: Boolean, default: false },
  ip: { type: String },
  report: { type: Number, default: 0 },
  isBanned: { type: Boolean, default: false },
  isOnline: { type: Boolean, default: false }, // new
  lastLogin: { type: Date, default: Date.now }, // new
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
