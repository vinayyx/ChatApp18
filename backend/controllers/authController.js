import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function generateToken(user) {
  return jwt.sign({ id: user._id, isGuest: user.isGuest }, process.env.JWT_SECRET, { expiresIn: "2h" });
}

// Guest Login
export const guestLogin = async (req, res) => {
  try {
    // IP fetch
    const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    // Username from body, fallback to auto-generated
    const username = req.body.username?.trim() || `guest_${Date.now()}`;

    

    // Create guest user
    const guestUser = new User({ username, isGuest: true, ip });
    await guestUser.save();

    // Generate token
    const token = generateToken(guestUser);

    // Send response
    res.status(200).json({ token, user: guestUser });
  } catch (err) {
    res.status(500).json({ message: "Guest login failed", error: err.message });
  }
};


// Sign Up
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already used" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, ip });
    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({ token, user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Sign up failed", error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isBanned) return res.status(403).json({ message: "User is banned" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    user.ip = ip;
    await user.save();

    const token = generateToken(user);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
