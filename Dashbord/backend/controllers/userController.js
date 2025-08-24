import onlineUsers from "../store.js";


// Get all online users
export const getOnlineUsers = (req, res) => {
  try {
    res.status(200).json(Object.keys(onlineUsers)); // return array of usernames
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch online users", error: err.message });
  }
};
