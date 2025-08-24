import React, { useEffect, useRef } from "react";

export default function ChatBox({ chatMessages, selectedUser }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="flex-1 bg-white text-black shadow-lg p-4 rounded-lg h-[60vh] md:h-[80vh] flex flex-col">
      <h2 className="font-bold text-lg mb-4">
        Chat with {selectedUser?.username || "Select a user"}
      </h2>

      <div className="flex-1 overflow-y-auto border p-2 rounded mb-2">
        {chatMessages.length === 0 && <p>No messages yet.</p>}

        {chatMessages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-semibold">{msg.fromUser}: </span>
            <span>{msg.message}</span>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
