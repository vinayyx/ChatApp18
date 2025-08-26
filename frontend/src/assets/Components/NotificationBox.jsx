import React, { useEffect, useState } from "react";
import { XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { io } from "socket.io-client";
import Spinner from "../ui/Spinner";

const socket = io(import.meta.env.VITE_BACKEND_URL);

export default function NotificationBox({ onClose }) {
  const userId = localStorage.getItem("userId");
  const [notifications, setNotifications] = useState([]);
  const [Loading, setLoading] = useState(false);

  // Fetch existing notifications from DB
  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/?userId=${userId}`
        );
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) fetchNotifications();
  }, [userId]);

  // Realtime notifications with socket.io
  useEffect(() => {
    socket.emit("joinUser", userId);

    socket.on("newNotification", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    return () => {
      socket.off("newNotification");
    };
  }, [userId]);

  return Loading ? (
    <div className="w-[70vw] sm:w-[65vw] md:w-[20vw] min-h-[30vh] bg-white rounded-lg shadow-xl border border-gray-200" >
    <div className="flex items-center justify-center h-[300px]">
      <Spinner size={25} thickness={2} speed="0.2s" />
    </div>
    </div>
  ) : (
    <div className="w-[70vw] sm:w-[65vw] md:w-[20vw] min-h-[30vh] bg-white rounded-lg shadow-xl border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <BellIcon className="h-5 w-5 text-gray-600" />
          <span className="font-semibold text-gray-700">Notifications</span>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-gray-100 p-1 rounded-full"
        >
          <XMarkIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Body */}
      <div className="max-h-72 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <p>No new notifications</p>
          </div>
        ) : (
          <ul>
            {notifications.map((n) => (
              <li
                key={n._id}
                className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <p className="text-sm text-gray-700">{n.message}</p>
                <span className="text-xs text-gray-400"></span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
