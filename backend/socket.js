import Message from "./models/Message.js";
import notification from "./models/notification.js";
import onlineUsers from "./store.js";

export const initSocket = (io) => {
  io.on("connection", (socket) => {
    // Join socket
    socket.on("join", ({ username }) => {
      onlineUsers[username] = socket.id;
      io.emit("onlineUsers", Object.keys(onlineUsers));

      console.log(onlineUsers[username]);
    });

    // Send public message
    socket.on("publicMessage", async ({ fromUser, message }) => {
      const msg = new Message({ fromUser, message }); // public message
      await msg.save();
      io.emit("publicMessage", msg);
    });

    // Send private message
    socket.on("privateMessage", async ({ fromUser, toUser, message }) => {
      const msg = new Message({ fromUser, toUser, message });
      await msg.save();

      if (onlineUsers[toUser]) {
        io.to(onlineUsers[toUser]).emit("privateMessage", msg);
      }

      if (onlineUsers[fromUser]) {
        io.to(onlineUsers[fromUser]).emit("privateMessage", msg);
      }
      io.emit("privateMessage", msg); // sender also sees it
    });

    socket.on("sendNotification", async ({ fromUser, toUser, message }) => {
      const notification = new notification({
        fromUser,
        toUser,
        message,
      });
      await notification.save();

      // Agar user online hai toh usko real-time bhej
      if (onlineUsers[toUser]) {
        io.to(onlineUsers[toUser]).emit("newNotification", notification);
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      for (let username in onlineUsers) {
        if (onlineUsers[username] === socket.id) delete onlineUsers[username];
      }
      io.emit("onlineUsers", Object.keys(onlineUsers));
    });
  });
};
