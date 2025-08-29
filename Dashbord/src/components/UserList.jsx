import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserList({ users = [], openChat, openNotification }) {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/online`
        );
        setOnlineUsers(res.data || []);
      } catch (err) {
        console.error("Failed to fetch online users:", err);
      }
    };
    fetchOnlineUsers();
  }, []);

  if (!users || users.length === 0) {
    return (
      <div className="w-full md:w-96 p-4 bg-white shadow-lg rounded-lg">
        No users found
      </div>
    );
  }

  const sortedUsers = [...users].sort((a, b) => {
    const aOnline = onlineUsers.includes(a.username);
    const bOnline = onlineUsers.includes(b.username);
    return aOnline === bOnline ? 0 : aOnline ? -1 : 1;
  });

  return (
    <div className="w-full md:w-96 bg-white shadow-lg p-4 rounded-lg h-[60vh] md:h-[80vh] overflow-y-auto">
      <h2 className="font-bold text-lg mb-4">Users ({users.length})</h2>

      {sortedUsers.map((user) => {
        const isOnline = onlineUsers.includes(user.username);
        return (
          <div
            key={user._id}
            className="flex justify-between items-center p-2 border-b cursor-pointer hover:bg-gray-100"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span>{user.username || "Guest"}</span>
                <span
                  className={`w-3 h-3 rounded-full ${
                    isOnline ? "bg-green-500" : "bg-gray-400"
                  } inline-block ml-2`}
                  title={isOnline ? "Online" : "Offline"}
                ></span>
              </div>
              {isOnline && (
                <small className="text-green-600 text-xs">Online</small>
              )}
            </div>

            <div className="flex flex-col items-end gap-1">
              <small className="text-gray-500 text-xs">
                Last login:{" "}
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleString()
                  : "N/A"}
              </small>

              <button
                onClick={() => openChat(user._id)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
              >
                Chat
              </button>

              <button
                onClick={() => openNotification(user)} // pass selected user to Dashboard
                className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 text-xs"
              >
                Send Notification
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
