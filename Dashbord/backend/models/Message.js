import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    fromUser: { type: String, required: true },
    toUser: { type: String }, // optional for public messages
    message: { type: String, required: true },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

export default mongoose.model("Message", messageSchema);
