import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import Reports from "./components/Reports";
import Feedback from "./components/Feedback";
import ChatBox from "./components/ChatBox";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 w-full relative">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alluser" element={<UserList />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/allchats" element={<ChatBox />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
