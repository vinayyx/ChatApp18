import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // npm i axios

function Login() {
  const navigate = useNavigate();
  const [view, setView] = useState("main"); 
  const [guestUsername, setGuestUsername] = useState(""); // Guest username input
  const [loginEmail, setLoginEmail] = useState("");       // Login email input
  const [loginPassword, setLoginPassword] = useState(""); // Login password input
  const [registerEmail, setRegisterEmail] = useState(""); // Register email
  const [registerUsername, setRegisterUsername] = useState(""); // Register username
  const [registerPassword, setRegisterPassword] = useState(""); // Register password

  // ================================
  // 1️⃣ Guest Login Handler
  // ================================
  

  const handleGuestLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/guest-login`, {
        username: guestUsername, // optional: backend will auto-generate if empty
      });


      const { token, user } = res.data;

      // Save token in localStorage (valid 2h in backend)
      localStorage.setItem("token", token);

      // Save username in localStorage (to show in chat)
      localStorage.setItem("username", user.username);

      localStorage.setItem("userId" , user._id )

      // Navigate to chat window (example route)
      navigate("/chat");
    } catch (err) {
      console.error("Guest login failed:", err);
      alert("Guest login failed");
    }
  };

  // ================================
  // 2️⃣ Main Login Handler
  // ================================
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email: loginEmail,
        password: loginPassword,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", user.username);

      navigate("/chat");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed: " + err.response?.data?.message || err.message);
    }
  };

  // ================================
  // 3️⃣ Register Handler
  // ================================
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        email: registerEmail,
        username: registerUsername,
        password: registerPassword,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", user.username);

      navigate("/chat");
    } catch (err) {
      console.error("Register failed:", err);
      alert("Register failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Navbar */}
      <div className="flex items-center justify-between px-8 py-5 ">
        <button
          onClick={() => {
            if (view === "main") navigate("/");
            else setView("main");
          }}
          type="button"
          className="flex items-center gap-2 border border-gray-700/50 px-4 py-2 text-sm text-gray-300 rounded-lg bg-gray-800/40 hover:text-pink-400 hover:border-pink-500/40 hover:bg-gray-800/60 transition-all duration-200 active:scale-95"
        >
          Back
        </button>
        <h1 className="text-white font-bold text-xl tracking-wide">SliceUp</h1>
      </div>

      {/* Body */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/20 hover:shadow-pink-500/20 transition duration-300">
            
            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white">
                {view === "main" && "Welcome"}
                {view === "guest" && "Guest Login"}
                {view === "login" && "Login"}
                {view === "register" && "Register"}
              </h1>
              <p className="text-blue-300 text-sm mt-2">
                {view === "main"
                  ? "Free Chat Rooms & Community"
                  : "Fill in the details to continue"}
              </p>
            </div>

            {/* MAIN VIEW */}
            {view === "main" && (
              <>
                <p className="text-slate-300 text-sm leading-relaxed text-center mb-6">
                  Join <span className="text-pink-400 font-semibold">SliceUp</span> today! 
                  Register a nickname or join as a guest user.
                </p>
                <div className="flex flex-col gap-4">
                  <button onClick={() => setView("guest")} className="w-full py-3 text-white text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg hover:scale-[1.03] hover:shadow-blue-500/30 transition-all duration-300">Guest Login</button>
                  <button onClick={() => setView("login")} className="w-full py-3 text-white text-sm font-semibold rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 shadow-lg hover:scale-[1.03] hover:shadow-pink-500/30 transition-all duration-300">Login</button>
                </div>
                <div className="flex items-center my-6">
                  <div className="flex-1 h-px bg-slate-600"></div>
                  <span className="px-3 text-slate-400 text-xs">New Here?</span>
                  <div className="flex-1 h-px bg-slate-600"></div>
                </div>
                <div className="text-center">
                  <button onClick={() => setView("register")} className="w-full py-3 text-sm font-semibold text-slate-800 rounded-xl bg-white hover:bg-slate-200 shadow-lg hover:scale-[1.02] transition-all duration-300">Register Now</button>
                </div>
              </>
            )}

            {/* GUEST VIEW */}
            {view === "guest" && (
              <form className="flex flex-col gap-4" onSubmit={handleGuestLogin}>
                <input type="text" placeholder="Enter Username" className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" value={guestUsername} onChange={(e)=>setGuestUsername(e.target.value)} />
                <button type="submit" className="w-full py-3 text-white text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] transition-all duration-300">Continue as Guest</button>
              </form>
            )}

            {/* LOGIN VIEW */}
            {view === "login" && (
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500" value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500" value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} />
                <button type="submit" className="w-full py-3 text-white text-sm font-semibold rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:scale-[1.02] transition-all duration-300">Login</button>
              </form>
            )}

            {/* REGISTER VIEW */}
            {view === "register" && (
              <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500" value={registerEmail} onChange={(e)=>setRegisterEmail(e.target.value)} />
                <input type="text" placeholder="Username" className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500" value={registerUsername} onChange={(e)=>setRegisterUsername(e.target.value)} />
                <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500" value={registerPassword} onChange={(e)=>setRegisterPassword(e.target.value)} />
                <button type="submit" className="w-full py-3 text-white text-sm font-semibold rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-[1.02] transition-all duration-300">Register</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
