import axios from "axios";
import { ClockFading } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ChatBox() {
  const location = useLocation();
  const [AllChats, setAllchats] = useState([]);

  const selectedUser = location.state?.selectedUser;

  const fatchUserAllchats = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/chats/${selectedUser._id}`
      );

      if (response) {
        setAllchats(response.data.messages);
      } else {
        console.log("eror to find a All chats");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fatchUserAllchats();
  }, [selectedUser]);

  console.log(AllChats);

  return (
   <div className="bg-gray-100 p-4 w-[85vw] rounded-lg shadow-md text-black">
  <h1 className="text-lg font-bold mb-4">
    All Conversation of {selectedUser.username}
  </h1>

  {AllChats.length > 0 ? (
    AllChats.map((chat, index) => (
      <div
        key={index}
        className="flex justify-between items-center bg-white p-3 rounded-md mb-2 shadow-sm"
      >
        <p className="text-sm font-medium">{chat.message}</p>
        <span className="text-xs text-gray-500" > {chat.toUser ? chat.toUser : "Public chat"} </span>
        <span className="text-xs text-gray-500">
          {new Date(chat.createdAt).toLocaleString()}
        </span>
      </div>
    ))
  ) : (
    <p className="text-gray-500 italic">No conversations yet...</p>
  )}
</div>


  );
}

export default ChatBox;
