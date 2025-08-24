import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
 reason: { type: String, required: true },
  reportedby: { type: String, required: true },   // username string
  reportedto: { type: String, required: true },   // username string
}, { timestamps: true });

export default mongoose.model("Report", reportSchema);
