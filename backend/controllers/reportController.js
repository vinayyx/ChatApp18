import report from "../models/report.js";

export const createReport = async (req, res) => {
  const { reason, reportedby, reportedto } = req.body;

  console.log("Received body:", req.body);

  try {
    if (!reason || !reportedby || !reportedto) {
      console.log("Validation failed:", { reason, reportedby, reportedto });
      return res.status(400).json({ error: "All fields required" });
    }

    const newReport = new report({
      reason,
      reportedby,
      reportedto,
    });

    await newReport.save();

    res.status(201).json({
      message: "Report submitted successfully",
      report: newReport,
    });
  } catch (error) {
    console.error("Error saving report:", error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
