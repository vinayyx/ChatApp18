import React from "react";
import { Navigate } from "react-router-dom";

// children = jo component render karna hai agar logged in ho
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // JWT token

  if (!token) {
    // agar token nahi hai, redirect login page
    return <Navigate to="/login" replace />;
  }

  return children; // agar token hai, render children
}

export default ProtectedRoute;
