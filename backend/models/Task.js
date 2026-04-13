const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["Pending", "In-Progress", "Completed"], default: "Pending" },
  time: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);