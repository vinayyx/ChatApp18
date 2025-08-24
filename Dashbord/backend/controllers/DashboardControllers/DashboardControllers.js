import User from "../../models/User.js"


export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

export const toggleBanUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBanned = !user.isBanned;
    await user.save();

    res.status(200).json({ message: `User ${user.isBanned ? "banned" : "unbanned"} successfully`, user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};


import Report from "../../models/report.js";

export const getUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ reportedto: req.params.id }).populate("reportedby", "username email");
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports", error: error.message });
  }
};


export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reportedby", "username email")
      .populate("reportedto", "username email");
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reports", error: error.message });
  }
};