import React, { useState, useEffect } from "react";
import SmallChatWindow from "./SmallChatWindow";
import socket from "../../socket";
import axios from "axios";
import { CheckCheck, Trash2, X, MessageCircle } from "lucide-react";
import Spinner from "../ui/Spinner";

function Messages({ onClose }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [Loading, setLoading] = useState(false);

  const currentUser = localStorage.getItem("username");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/messages/getUsersWithMessages/${currentUser}`
        );

        const filtered = res.data.filter((u) => u.username !== currentUser);

        
  
          


        

        const withCounts =  filtered.filter((_, id) => id !== 0).map((u, idx) => ({ 
          id: idx ,
          ...u,
          count: 0,
          avatar: `https://i.pravatar.cc/40?u=${u.username}`,
        })) ;

    
        
        setMessageList(withCounts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    const handleIncoming = (msg) => {
      if (msg.fromUser === currentUser || msg.toUser === currentUser) {
        const otherUser =
          msg.fromUser === currentUser ? msg.toUser : msg.fromUser;

        if (!selectedUser || selectedUser.username !== otherUser) {
          setMessageList((prev) => {
            const exists = prev.find((u) => u.username === otherUser);
            if (exists) {
              return prev.map((u) =>
                u.username === otherUser ? { ...u, count: u.count + 1 } : u
              );
            } else {
              return [
                ...prev,
                {
                  id: Date.now(),
                  username: otherUser,
                  count: 1,
                  avatar: `https://i.pravatar.cc/40?u=${otherUser}`,
                },
              ];
            }
          });
        }
      }
    };

    socket.on("privateMessage", handleIncoming);

    return () => {
      socket.off("privateMessage", handleIncoming);
    };
  }, [currentUser, selectedUser]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessageList((prev) =>
      prev.map((u) => (u.username === user.username ? { ...u, count: 0 } : u))
    );
  };

  // ✅ Mark all as read
  const markAllRead = () => {
    setMessageList((prev) => prev.map((u) => ({ ...u, count: 0 })));
  };

  // ✅ Delete all messages list
  const deleteAllMessages = () => {
    setMessageList([]);
  };

  // ✅ Delete single user
  const deleteUser = (username) => {
    setMessageList((prev) => prev.filter((u) => u.username !== username));
  };

  return (
    <div className="bg-white shadow-md  overflow-hidden w-[70vw] sm:w-[65vw] md:w-[20vw] min-h-[30vh] sm:min-h-[30vh] flex flex-col">
      {/* ✅ Top Navbar */}
      <div className="flex items-center justify-between bg-white px-3 py-2 border-b border-gray-300">
        <div className="flex items-center gap-2 text-gray-800 font-semibold text-sm">
          <MessageCircle size={16} /> Private
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={markAllRead}
            className="text-gray-500 hover:text-green-500"
            title="Mark all as read"
          >
            <CheckCheck size={18} />
          </button>
          <button
            onClick={deleteAllMessages}
            className="text-gray-500 hover:text-red-500"
            title="Delete all messages"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={() => onClose && onClose()}
            className="text-gray-500 hover:text-red-500"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ✅ Messages List */}

      {Loading ? (
        <div className="flex items-center justify-center h-[200px]">
          <Spinner size={25} thickness={2} speed="0.2s" />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {messageList.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-center justify-between px-3 py-2 cursor-pointer font-extrabold hover:bg-gray-100 ${
                selectedUser?.username === msg.username ? "bg-gray-100" : ""
              }`}
              onClick={() => handleUserClick(msg)}
            >
              {/* Left: Avatar + Username */}
              <div className="flex items-center gap-2">
                <img
                  src={msg.avatar}
                  alt={msg.username}
                  className="w-8 h-8 rounded-full object-cover bg-gray-200"
                />
                <span className="text-sm text-gray-800 font-medium">
                  {msg.username}
                </span>
              </div>

              {/* Right: Unread + Delete */}
              <div className="flex items-center gap-2">
                {msg.count > 0 && (
                  <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {msg.count}
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteUser(msg.username);
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
          {messageList.length === 0 && (
            <p className="text-center text-gray-400 text-sm mt-4">
              No messages
            </p>
          )}
        </div>
      )}

      {/* ✅ Small Chat Window */}
      {selectedUser && (
        <SmallChatWindow
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}

export default Messages;
