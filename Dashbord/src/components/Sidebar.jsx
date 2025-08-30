import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <div
      className={`fixed md:static top-0 left-0 h-full 
        w-[70vw] md:w-[15vw] bg-gray-800 text-white 
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-4 font-bold text-lg border-b border-gray-700">
        Menu
      </div>
      <ul className="space-y-4 p-4">
        <li>
          <Link to="/" onClick={() => setIsOpen(false)}>Dashboard</Link>
        </li>
        <li>
          <Link to="/alluser" onClick={() => setIsOpen(false)}>All Users</Link>
        </li>
        <li>
          <Link to="/reports" onClick={() => setIsOpen(false)}>Reports</Link>
        </li>
        <li>
          <Link to="/feedback" onClick={() => setIsOpen(false)}>Feedback</Link>
        </li>
      </ul>
    </div>
  );
}
