import React, { useEffect, useRef, useState } from "react";
import ReportModal from "./ReportModal"; // 👈 import kiya

function UserOptionsPopup({ onClose, onPrivateMessage, onBlock, position, selectedUser }) {
  const popupRef = useRef();
  const [user, setUser] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  // Logged in user
  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Click outside close
  useEffect(() => {
    if (showReportModal) return; // agar modal open hai toh ignore karo

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, showReportModal]);

  // Report function -> open modal
  const handleReport = () => {
    setShowReportModal(true);
  };

  return (
    <>
      {/* Main Popup */}
      <div
        ref={popupRef}
        style={{ top: position.y, left: position.x }}
        className="absolute z-40 w-64 sm:w-64 w-[90%] bg-white rounded-lg shadow-lg border overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-[#1e293b]/90 p-4 text-center text-white">
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
            {selectedUser?.avatar ? (
              <img
                src={selectedUser.avatar}
                alt="dp"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl">👤</span>
            )}
          </div>
          <h2 className="mt-2 text-lg font-semibold">
            {selectedUser?.username || "Guest"}
          </h2>
          <p className="text-sm">
            {selectedUser?.age ? `${selectedUser.age} years` : "N/A"} •{" "}
            {selectedUser?.gender || "Other"}
          </p>
          {selectedUser?.countryCode && (
            <div className="mt-1 flex justify-center text-2xl">
              {selectedUser.countryCode}
            </div>
          )}
        </div>

        {/* Options Section */}
        <div className="divide-y">
          <button
            className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={onPrivateMessage}
          >
            <span>💬</span> Private
          </button>

          <button
            className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleReport}
          >
            <span>🚩</span> Report
          </button>

          <button
            className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-100"
            onClick={onBlock}
          >
            <span>⛔</span> Block
          </button>
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal
          onClose={() => setShowReportModal(false)}
          selectedUser={selectedUser}
        />
      )}
    </>
  );
}

export default UserOptionsPopup;
