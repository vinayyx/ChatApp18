import React, { useState } from "react";
import NavbarForChatWindow from "../Components/NavbarForChatWindow";
import PublicChat from "../Components/PublicChat";
import Users from "../Components/Users";
import FotterForChat from "../Components/FotterForChat";

function ChatWindow() {
  const [showUsers, setShowUsers] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <div className="flex-shrink-0">
        <NavbarForChatWindow />
      </div>

      {/* Main Section */}
      <div className="flex-1 flex overflow-hidden relative transition-all duration-300">
        {/* Public Chat */}
        <div
          className={`transition-all duration-300 ${
            showUsers ? "md:w-[calc(100%-300px)]" : "w-full"
          } overflow-y-auto`}
        >
          <PublicChat />
        </div>

        {/* Users Sidebar */}
        {showUsers && (
          <div
         className={`
  transition-all duration-300 bg-white border-l border-gray-300
  md:static md:w-[300px] md:flex-shrink-0
  absolute top-0 right-0 w-[70vw] h-full z-50 md:z-0
`}

          >
            <Users onClose={() => setShowUsers(false)} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0">
        <FotterForChat toggleUsers={() => setShowUsers(!showUsers)} />
      </div>
    </div>
  );
}

export default ChatWindow;
