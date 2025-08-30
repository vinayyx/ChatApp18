import { useState } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";

const UserProvider = ({ children }) => {

    const navigate = useNavigate();


    const value = { navigate
    };


  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
