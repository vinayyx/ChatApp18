import React, { useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    // user message UI me add
    const newMessages = [...messages, { from: "You", text: userMessage }];
    setMessages(newMessages);
    setUserMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setMessages([...newMessages, { from: "AI", text: data.reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="p-4 bg-gray-800 border-b border-gray-700 rounded-t-lg">
        <h2 className="text-lg font-semibold">💬 Chat with Girl AI</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.from === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs ${
                msg.from === "You"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-400 italic">AI is typing...</div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="p-3 bg-gray-800 border-t border-gray-700 flex"
      >
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white outline-none"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
        >
          Send
        </button>
      </form>
    </div>
  );
}
