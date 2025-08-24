import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function ReportInput({ onClose }) {
  const [reason, setReason] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // 👈 yaha hook use karna zaroori hai

  // receive selectedUser from navigation state
  const { selectedUser } = location.state || {};

  // current logged-in user (reporter)
  const user = localStorage.getItem("username");
  console.log(reason, user, selectedUser.username);

  const handleReport = async () => {
    if (!reason || !user || !selectedUser) {
      return alert("Please enter a valid reason and select a user");
    }

    try {
      await axios.post(
        "http://localhost:5000/api/report",
        { reason, reportedby: user, reportedto: selectedUser.username },
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Report submitted successfully!");
      navigate("/chat");
    } catch (error) {
      console.error("Report error:", error);
      alert("Failed to submit report");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-96 rounded-xl shadow-lg p-6">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Report {selectedUser?.username}
        </h2>

        {/* Input */}
        <textarea
          className="w-full p-3 border text-black rounded-lg outline-none focus:ring-2 focus:ring-red-500"
          rows={4}
          placeholder="Enter reason for reporting..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        {/* Buttons */}
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleReport} // 👈 yaha galti thi, () hata diya
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportInput;
