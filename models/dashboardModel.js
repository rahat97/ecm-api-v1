const mongoose = require("mongoose");
const grnSchema = mongoose.Schema(
  {
    date: { type: String },
    // productName: { type: String, require: true },
    // type: { type: String, enum: ["in", "out"] },
    // status: { type: String, enum: ["active", "suspend"] }
  },
  {
    timestamps: true,
  }
);
const dashboard = new mongoose.model("dashboard", grnSchema);
module.exports = dashboard;