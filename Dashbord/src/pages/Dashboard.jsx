import React, { useEffect, useState } from "react";
import axios from "axios";
import UserList from "../components/UserList";
import ChatBox from "../components/ChatBox";
import Navbar from "../components/Navbar";
import NotificationBox from "../components/NotificationBox";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [notificationUser, setNotificationUser] = useState(null); // <-- for notifications

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/db/users`);
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users");
    }
  };

  const openChat = async (userId) => {
    try {
      const selected = users.find((u) => u._id === userId);
      setSelectedUser(selected);

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/chats/${userId}`,
        {
          params: { currentUser: localStorage.getItem("username") },
        }
      );

      setChatMessages(res.data.messages || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch chat");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row p-4 md:p-6 gap-4 md:gap-6">
        <UserList
          users={users}
          openChat={openChat}
          openNotification={setNotificationUser} // pass function to open notif
        />

        {notificationUser ? (
          <NotificationBox
            targetUser={notificationUser} // pass selected user
            onClose={() => setNotificationUser(null)}
          />
        ) : (
          <ChatBox chatMessages={chatMessages} selectedUser={selectedUser} />
        )}
      </div>
    </div>
  );
}
