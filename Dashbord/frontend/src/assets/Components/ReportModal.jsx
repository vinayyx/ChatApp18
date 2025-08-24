// src/components/ReportModal.jsx
import React, { useState } from "react";
import axios from "axios";

function ReportModal({ onClose, selectedUser }) {
  const [reason, setReason] = useState("");
  const user = localStorage.getItem("username"); // logged in user

  const handleReport = async (e) => {
    e.preventDefault();

    if (!reason || !user || !selectedUser) {
      return alert("Please enter a valid reason and select a user");
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/report`,
        { reason, reportedby: user, reportedto: selectedUser.username },
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Report submitted successfully!");
      onClose(); // modal close
    } catch (error) {
      console.error("Report error:", error);
      alert("Failed to submit report");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✖
        </button>

        {/* Header */}
        <h2 className="text-lg font-bold mb-4">
          Report {selectedUser?.username}
        </h2>

        {/* Report Form */}
        <form onSubmit={handleReport} className="flex flex-col gap-3">
          <textarea
            placeholder="Enter reason..."
            className="border p-2 rounded resize-none text-black"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          ></textarea>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportModal;
