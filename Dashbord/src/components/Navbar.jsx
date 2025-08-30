import React from "react";
import { Menu } from "lucide-react"; // Hamburger icon (lucide-react library)

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="bg-gray-900 text-white p-4 h-[10vh] flex justify-between items-center">
      {/* Left: Hamburger on small screens */}
      <button
        className="md:hidden block"
        onClick={toggleSidebar}
      >
        <Menu size={28} />
      </button>

      {/* Title */}
      <h1 className="text-xl font-bold mx-auto md:mx-0">
        Admin Dashboard
      </h1>
    </nav>
  );
}
