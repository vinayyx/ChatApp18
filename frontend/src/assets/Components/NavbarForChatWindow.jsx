import React, { useState, useEffect } from "react";
import {
  Bars3Icon,
  ChatBubbleLeftEllipsisIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Messages from "./Messages";
import UserProfile from "./UserProfile";
import NotificationBox from "./NotificationBox"; 
import socket from "../../socket";

function NavbarForChatWindow() {
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [hasNewMessage, setHasNewMessage] = useState(false); // ✅ private msg indicator
  const [hasNewNotification, setHasNewNotification] = useState(false); // ✅ notif indicator

  const username = localStorage.getItem("username") || "Guest";
  const isGuest = username.startsWith("guest_");

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  // ✅ Socket Listeners
  useEffect(() => {
    // sirf PRIVATE messages par red-dot
    socket.on("privateMessage", (msg) => {
      if (msg.toUser === username && msg.fromUser !== username) {
        if (!showMessages) setHasNewMessage(true);
      }
    });

    // sirf NOTIFICATION event par red-dot
    socket.on("notification", (notif) => {
      if (!showNotifications) setHasNewNotification(true);
    });

    return () => {
      socket.off("privateMessage");
      socket.off("notification");
    };
  }, [showMessages, showNotifications, username]);

  // ✅ Handlers
  const handleMessagesClick = () => {
    setShowMessages((prev) => {
      const newState = !prev;
      if (newState) {
        setHasNewMessage(false); // clear red-dot
        setShowNotifications(false);
        setShowProfile(false);
      }
      return newState;
    });
  };

  const handleNotificationsClick = () => {
    setShowNotifications((prev) => {
      const newState = !prev;
      if (newState) {
        setHasNewNotification(false); // clear red-dot
        setShowMessages(false);
        setShowProfile(false);
      }
      return newState;
    });
  };

  const handleProfileClick = () => {
    setShowProfile((prev) => {
      const newState = !prev;
      if (newState) {
        setShowMessages(false);
        setShowNotifications(false);
      }
      return newState;
    });
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-4 py-2 shadow-lg bg-gradient-to-r from-[#0f172a] to-[#1e293b] relative z-10">
        {/* Left - Hamburger */}
        <button className="p-2 rounded-lg hover:bg-white/10 transition">
          <Bars3Icon className="w-7 h-7 text-white" />
        </button>

        {/* Right - Icons */}
        <div className="flex items-center gap-6">
          {/* Message */}
          <div className="relative cursor-pointer" onClick={handleMessagesClick}>
            <ChatBubbleLeftEllipsisIcon className="w-7 h-7 text-white hover:text-blue-400 transition" />
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-600 border border-white shadow-md"></span>
            )}
          </div>

          {/* Notification */}
          <div className="relative cursor-pointer" onClick={handleNotificationsClick}>
            <BellIcon className="w-7 h-7 text-white hover:text-blue-400 transition" />
            {hasNewNotification && (
              <span className="absolute top-0 right-0 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <UserCircleIcon
              className="w-8 h-8 text-white cursor-pointer hover:text-blue-400 transition"
              onClick={handleProfileClick}
            />
            {showProfile && (
              <div className="absolute right-0 mt-2 shadow-lg">
                <UserProfile
                  username={username}
                  isGuest={isGuest}
                  onLogout={handleLogout}
                />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Messages Panel */}
      {showMessages && (
        <div className="absolute top-16 right-0 z-50 shadow-2xl">
          <Messages onClose={handleMessagesClick} />
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute top-16 right-0 z-50 shadow-2xl">
          <NotificationBox onClose={handleNotificationsClick} />
        </div>
      )}
    </div>
  );
}

export default NavbarForChatWindow;
