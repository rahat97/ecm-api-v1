const mongoose = require("mongoose");
const employeeSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String },
    address: { type: String },
    nid: { type: String },
    designation: { type: String, enum: ["site_manager", "site_engineer", "accounts", "assistant_accounts", "project_manager", "project_engineer", "project_accounts"] },
    photo: { type: String },
    type: { type: String, enum: ["company", "subContract", "master_roll"] },
    status: { type: String, enum: ["active", "suspend"] },
  },
  {
    timestamps: true,
  }
);

const employee = new mongoose.model("Employee", employeeSchema);
module.exports = employee;
