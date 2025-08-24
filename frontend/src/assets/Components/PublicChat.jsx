import React, { useEffect, useState, useRef, useCallback } from "react";
import EmojiPicker from "emoji-picker-react";
import { io } from "socket.io-client";
import SmallChatWindow from "./SmallChatWindow";
import UserOptionsPopup from "./UserOptionsPopup";

const socket = io(import.meta.env.VITE_BACKEND_URL);

// ✅ Input bar ko separate component
const ChatInputBar = React.memo(function ChatInputBar({
  message,
  setMessage,
  sendMessage,
  showEmoji,
  setShowEmoji,
}) {
  return (
    <div className="w-full border-t bg-white p-2">
      {showEmoji && (
        <div className="absolute bottom-16 left-4 shadow-lg z-10">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              setMessage((prev) => prev + emojiData.emoji);
              setShowEmoji(false);
            }}
          />
        </div>
      )}

      <div className="flex items-center h-10 w-full text-sm rounded-lg bg-white border border-gray-300 shadow-sm">
        <button
          type="button"
          className="h-full px-2 text-gray-700 hover:text-blue-600"
          onClick={() => setShowEmoji((prev) => !prev)}
        >
          😀
        </button>
        <input
          className="outline-none bg-transparent h-full w-full px-2 text-black text-sm"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          type="button"
          className="h-full w-12 flex items-center justify-center rounded-r-lg bg-black text-white hover:bg-gray-800 transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
});

function PublicChat() {
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [username] = useState(localStorage.getItem("username") || "Guest");

  const [selectedUser, setSelectedUser] = useState(null);
  const [optionsUser, setOptionsUser] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    socket.emit("join", { username });

    socket.on("publicMessage", (msg) =>
      setChats((prev) => [...prev, msg])
    );

    const fetchMessages = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/public`);
        const data = await res.json();
        setChats(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMessages();

    return () => socket.off("publicMessage");
  }, [username]);

  useEffect(scrollToBottom, [chats]);

  // ✅ useCallback to avoid re-renders
  const sendMessage = useCallback(() => {
    if (!message.trim()) return;
    const msgData = { fromUser: username, message: message.trim() };
    socket.emit("publicMessage", msgData);
    setMessage("");
  }, [message, username]);

  const handleProfileClick = (user, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({ x: rect.right + 8, y: rect.top });
    setOptionsUser(user);
  };

return (
  <div className="flex flex-col h-full w-full bg-white relative">
    {/* Messages */}
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {chats.map((chat, idx) => (
        <div key={idx} className="flex items-start justify-between space-x-2 w-full">
          <div
            className={`flex items-center gap-3 px-3 py-2 rounded-lg shadow-sm w-full ${
              idx % 2 === 0 ? "bg-white" : "bg-gray-100"
            }`}
          >
            <div
              className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              onClick={(e) => handleProfileClick(chat.fromUser, e)}
            >
              {chat.fromUser.charAt(0).toUpperCase()}
            </div>
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                <p className="font-semibold text-xs text-black">{chat.fromUser}</p>
                <p className="text-sm text-black">{chat.message}</p>
              </div>
              <span className="text-[10px] text-gray-500 mt-1 self-end">
                {new Date(chat.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>

    {/* ✅ Fixed Input Bar at Bottom */}
    <ChatInputBar
      message={message}
      setMessage={setMessage}
      sendMessage={sendMessage}
      showEmoji={showEmoji}
      setShowEmoji={setShowEmoji}
    />

    {/* Options Popup */}
    {optionsUser && (
      <UserOptionsPopup
        onClose={() => setOptionsUser(null)}
        onPrivateMessage={() => setSelectedUser({ username: optionsUser })}
        onReport={() => alert("Reported " + optionsUser)}
        onBlock={() => alert("Blocked " + optionsUser)}
        position={popupPosition}
        selectedUser={{ username: optionsUser }}
      />
    )}

    {/* Private Chat */}
    {selectedUser && (
      <SmallChatWindow
        user={{
          username: selectedUser.username,
          avatar: `https://i.pravatar.cc/40?u=${selectedUser.username}`,
        }}
        onClose={() => setSelectedUser(null)}
      />
    )}
  </div>
);

}

export default PublicChat;
