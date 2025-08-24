import Message from "../models/Message.js";

// Get all public messages
export const getPublicMessages = async (req, res) => {
  try {
    const messages = await Message.find({ toUser: null }).sort({ createdAt: 1 }); // ascending order
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages", error: err.message });
  }
};

// Get private messages between two users
export const getPrivateMessages = async (req, res) => {
  try {
    const { fromUser, toUser } = req.params;

    const messages = await Message.find({
      $or: [
        { fromUser, toUser },
        { fromUser: toUser, toUser: fromUser }, // reverse direction
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch private messages", error: err.message });
  }
};






// Get all users who had conversation with currentUser
export const getUsersWithMessages = async (req, res) => {
  try {
    const { username } = req.params; // frontend se bhejna hoga

    // Find distinct users who either sent or received msgs with currentUser
    const messages = await Message.find({
      $or: [{ fromUser: username }, { toUser: username }]
    });

    // Extract unique users
    const users = [
      ...new Set(
        messages.map((msg) =>
          msg.fromUser === username ? msg.toUser : msg.fromUser
        )
      ),
    ];

    res.json(users.map((u) => ({ username: u })));
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

