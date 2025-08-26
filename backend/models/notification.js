import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true, // kya likha h notification me
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // kis user ke liye notification hai
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now, // kab bana
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
