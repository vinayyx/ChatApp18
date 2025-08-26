import React from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, User, LogOut } from "lucide-react"; // icons like screenshot

function UserProfile() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Guest"; // ✅ from localStorage
  const isGuest = username === "Guest";

  const handleLogout = () => {
    // Clear everything from localStorage
    localStorage.clear();
    // Redirect to home page
    navigate("/");
  };

  return (
    <div className="w-64 bg-white text-gray-900  shadow-lg ">
      {/* Top user info */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200">
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold">
          {username.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{username}</p>
          <p className="text-sm text-gray-500">
            {isGuest ? "Guest" : "Verified"}
          </p>
        </div>
        <div className="ml-auto text-green-500">✔</div>
      </div>

      {/* Options */}
      <div className="flex flex-col text-sm">
        {/* Wallet */}
        <button className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition text-gray-800">
          <Wallet className="w-5 h-5 text-sky-500" />
          Wallet
          <span className="ml-auto">{">"}</span>
        </button>

        {/* Edit Profile */}
        <button className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition text-gray-800">
          <User className="w-5 h-5 text-sky-500" />
          Edit profile
        </button>
      </div>

      <hr />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-gray-100 transition text-sm"
      >
        <LogOut className="w-5 h-5 text-red-500" />
        Logout
      </button>
    </div>
  );
}

export default UserProfile;
