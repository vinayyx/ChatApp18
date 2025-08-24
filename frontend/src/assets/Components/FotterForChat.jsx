import React from "react";
import { Radio, Menu } from "lucide-react";

function FotterForChat({ toggleUsers }) {
  return (
    <div className="w-full h-[7vh] bg-gradient-to-r from-[#0f172a] to-[#1e293b] flex items-center justify-between px-6  shadow-md">
      
      {/* Radio Icon */}
      <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition">
        <Radio className="text-white w-6 h-6" />
      </button>

      {/* Chat With Girls Button */}
      <button className="px-4 py-2 rounded-full bg-white text-[#0f172a] font-semibold hover:bg-gray-200 transition">
        Chat with Girls
      </button>

      {/* Hamburger Menu */}
      <button
        onClick={toggleUsers}
        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
      >
        <Menu className="text-white w-6 h-6" />
      </button>
    </div>
  );
}

export default FotterForChat;
