import React from "react";
import { XMarkIcon, BellIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function NotificationBox({ onClose }) {
  const notifications = [
    { id: 1, text: "New message from Mia", time: "2 min ago" },
    { id: 2, text: "Server update completed", time: "1 hr ago" },
  ];

  return (
    <div className="w-[70vw] sm:w-[65vw] md:w-[20vw] min-h-[30vh] sm:min-h-[30vh] bg-white rounded-lg shadow-xl border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <BellIcon className="h-5 w-5 text-gray-600" />
          <span className="font-semibold text-gray-700">Notifications</span>
        </div>
        <button onClick={onClose} className="hover:bg-gray-100 p-1 rounded-full">
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
                key={n.id}
                className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              >
                <p className="text-sm text-gray-700">{n.text}</p>
                <span className="text-xs text-gray-400">{n.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
