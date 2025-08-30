import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MessageSquare, Bell } from "lucide-react"; 
import UserContext from "../Context/UserContext";

function UserList() {
  const [users, setUsers] = useState([]);
  const { navigate } = useContext(UserContext);

  const fatchAllUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/db/users`
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fatchAllUsers();
  }, []);

  return (
    <div className="p-4 w-full md:w-full  md:h-[87vh] overflow-auto h-[90vh] text-black">
      <h1 className="text-xl font-bold mb-4 text-center md:text-left">All Users</h1>

      {/* User List */}
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user._id}
            className="w-full bg-gray-200 text-black rounded-xl shadow-md p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
          >
            {/* User Name */}
            <h2 className="text-lg font-semibold text-center sm:text-left">
              {user.username}
            </h2>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
              {/* Chat Button */}
              <button
                onClick={() =>
                  navigate("/allchats", { state: { selectedUser: user } })
                }
                className="flex items-center gap-1 bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded-lg shadow-sm transition text-sm sm:text-base"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </button>

              {/* Notification Button */}
              <button className="flex items-center gap-1 bg-gray-300 hover:bg-gray-400 px-3 py-2 rounded-lg shadow-sm transition text-sm sm:text-base">
                <Bell className="w-4 h-4" />
                <span>Notify</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
