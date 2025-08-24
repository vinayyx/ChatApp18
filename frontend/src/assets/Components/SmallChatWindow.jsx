import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import socket from "../../socket";

function SmallChatWindow({ user, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const currentUser = localStorage.getItem("username");
  const messagesEndRef = useRef(null);

  // Auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch old messages
  useEffect(() => {
    if (!user) return;
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/messages/private/${currentUser}/${user.username}`
        );
        const data = await res.json();
        setMessages(data || []);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [user, currentUser]);

  // Realtime listener
  useEffect(() => {
    const handlePrivateMessage = (msg) => {
      if (
        (msg.fromUser === user?.username && msg.toUser === currentUser) ||
        (msg.toUser === user?.username && msg.fromUser === currentUser)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socket.on("privateMessage", handlePrivateMessage);
    return () => socket.off("privateMessage", handlePrivateMessage);
  }, [user, currentUser]);

  // Send msg
  const sendMessage = () => {
    if (!newMsg.trim()) return;
    const msgData = {
      fromUser: currentUser,
      toUser: user.username,
      message: newMsg,
      createdAt: new Date().toISOString(),
    };
    socket.emit("privateMessage", msgData);
    setNewMsg("");
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-0 right-0 w-full sm:w-80 h-96 
           flex flex-col bg-white rounded-lg shadow-lg border z-50">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-800 text-white px-3 py-2">
        <div className="flex items-center gap-2">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-7 h-7 rounded-full"
          />
          <span className="font-medium text-sm">{user.username}</span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
              msg.fromUser === currentUser
                ? "bg-gray-800 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-900 self-start"
            }`}
          >
            {msg.message}
            <div className="text-[10px] text-gray-500 mt-1">
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-2 border-t bg-white">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type here..."
          className="flex-1 px-3 py-2 text-black rounded-full border text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-full bg-gray-800 text-white text-sm hover:bg-gray-700 transition"
        >
          ➤
        </button>
      </div>
    </div>
  );
}

export default SmallChatWindow;
