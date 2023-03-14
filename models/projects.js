const mongoose = require("mongoose");
const projectSchema = mongoose.Schema(
  {
    pid: { type: String, require: true },
    name: { type: String, require: true },
    client: { type: mongoose.Types.ObjectId, ref: "Client" },
    location: { type: String },
    details: { type: String },
    budgets: { type: String },
    stuff: { type: String },
    // projectManager: { type: String, require: true },
    duration: { type: String },
    workOrder: { type: String },
    // manager: { type: String, require: true },
    // accounts: { type: String, require: true },
    // engineer: { type: mongoose.Types.ObjectId, ref: "User" },
    subContractor: { type: mongoose.Types.ObjectId, ref: "SubContractor" },
    status: { type: String, enum: ["active", "suspend"] },
  },
  {
    timestamps: true,
  }
);
const project = new mongoose.model("Project", projectSchema);
module.exports = project;
