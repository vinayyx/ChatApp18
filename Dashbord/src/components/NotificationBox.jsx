import React, { useState } from "react";
import axios from "axios";

function NotificationBox({ targetUser, onClose }) {

        console.log(targetUser._id)

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendNotification = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/notifaction`,
        {
          userId: targetUser._id,                // receiver
          message,
        }
      );


      
 


      if (res.status === 200) {
        setStatus("✅ Notification sent!");
        setMessage("");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to send notification");
    }
  };

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg w-full md:w-80">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-lg">Send Notification</h2>
        <button onClick={onClose} className="text-red-500 font-bold">X</button>
      </div>

      <p className="text-sm mb-2">To: {targetUser?.username}</p>

      <textarea
        className="w-full border rounded p-2 mb-2"
        rows="3"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendNotification}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Send
      </button>

      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  );
}

export default NotificationBox;
