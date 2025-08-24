import Message from "../models/Message.js";
import User from "../models/User.js";

// Fetch all messages of a user by their ID
export const getUserChats = async (req, res) => {
  const { userId } = req.params; // selected user's ID

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Get username of the selected user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const username = user.username;

    // Fetch all messages where this user is sender or receiver
    const messages = await Message.find({
      $or: [{ fromUser: username }, { toUser: username }]
    }).sort({ createdAt: 1 }); // ascending order

    res.status(200).json({ messages });
  } catch (error) {
    console.error("Fetch chat error:", error);
    res.status(500).json({ error: "Failed to fetch chat messages" });
  }
};
