import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../socket"; // same socket instance
import { X } from "lucide-react";
import UserOptionsPopup from "./UserOptionsPopup";
import SmallChatWindow from "./SmallChatWindow"; // ✅ import chat window

function Users({ onClose }) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [optionsUser, setOptionsUser] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [selectedUser, setSelectedUser] = useState(null);

  const currentUser = localStorage.getItem("username");

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/online`);
        const filtered = res.data.filter((u) => u !== currentUser);
        setOnlineUsers(filtered);
      } catch (err) {
        console.error("Failed to fetch online users:", err);
      }
    };

    fetchOnlineUsers();

    const handleOnlineUsers = (users) => {
      const filtered = users.filter((u) => u !== currentUser);
      setOnlineUsers(filtered);
    };

    socket.on("onlineUsers", handleOnlineUsers);

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, [currentUser]);

  // ✅ When clicking user, show popup
  // ✅ When clicking user, show popup (but keep inside screen)
  const handleUserClick = (username, event) => {
    const isMobile = window.innerWidth < 640; // Tailwind 'sm' breakpoint
    const popupWidth = isMobile ? window.innerWidth * 0.9 : 260;
    const popupHeight = 280;
    const padding = 10;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = event.clientX;
    let y = event.clientY;

    // ✅ Adjust X (centered on mobile, right on desktop)
    if (isMobile) {
      x = (viewportWidth - popupWidth) / 2; // always center
    } else if (x + popupWidth + padding > viewportWidth) {
      x = viewportWidth - popupWidth - padding;
    }

    // ✅ Adjust Y (prevent overflow)
    if (y + popupHeight + padding > viewportHeight) {
      y = viewportHeight - popupHeight - padding;
    }

    if (x < padding) x = padding;
    if (y < padding) y = padding;

    setOptionsUser(username);
    setPopupPosition({ x, y });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Users List */}
      <div
        className="bg-white text-gray-900  
                      w-full sm:w-[20vw] h-auto sm:h-[80vh] flex flex-col border"
      >
        {/* Thin Top Navbar */}
        <div className="h-10 border-b border-gray-300 flex items-center justify-between px-3">
          <h1 className="text-sm font-semibold">
            Online ({onlineUsers.length})
          </h1>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-200 transition"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {onlineUsers.map((username, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 bg-gray-100 hover:bg-gray-200 cursor-pointer transition"
              onClick={(e) => handleUserClick(username, e)}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-sm font-bold text-white">
                  {username.charAt(0).toUpperCase()}
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <p className="text-sm font-medium">{username}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ User Options Popup */}
      {optionsUser && (
        <UserOptionsPopup
          onClose={() => setOptionsUser(null)}
          onPrivateMessage={() => {
            setSelectedUser({ username: optionsUser }); // private ke liye set
            setOptionsUser(null);
          }}
          onReport={() => alert("Reported " + optionsUser)}
          onBlock={() => alert("Blocked " + optionsUser)}
          position={popupPosition}
          selectedUser={{ username: optionsUser }} // ✅ yahan fix
        />
      )}

      {/* ✅ Small Chat Window opens after clicking Private */}
      {selectedUser && (
        <SmallChatWindow
          user={{
            username: selectedUser.username,
            avatar: `https://i.pravatar.cc/40?u=${selectedUser.username}`,
          }}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

export default Users;
