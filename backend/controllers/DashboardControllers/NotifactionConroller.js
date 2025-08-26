import notification from "../../models/notification.js";
import onlineUsers from "../../store.js"; // jisme user: socket.id map store hai

// FATCH ALL  FOR PERTICULER USER (THIS CONTROLLER FOR FRONTEND)

export const SendNotification = async (req, res) => {
  const { userId, message } = req.body;

  try {
    if (!userId || !message) {
      res.error(404).json("All fileds are required");
    }

    const newNotification = new notification({
      user: userId,
      message,
    });

    await newNotification.save();

    const io = req.app.get("io"); // socket instance ko express app me set karna padega
    if (onlineUsers[userId]) {
      io.to(onlineUsers[userId]).emit("notification", notification);
    }

    res.status(200).json({ success: true, notification });
  } catch (error) {
    console.error("Notification error:", error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

export const GetAllNotifications = async (req, res) => {
  try {
    const { userId } = req.query
    const notifications = await notification.find({ user : userId }).sort({
      time: -1,
    }); // latest first
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Error fetching notifications" });
  }
};
