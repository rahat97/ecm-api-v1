const mongoose = require("mongoose");
const supplierSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String },
    address: { type: String },
    nid: { type: String },
    company: { type: String },
    tradeLicense: { type: String },
    status: { type: String, enum: ["active", "suspend"] },
  },
  {
    timestamps: true,
  }
);
const supplier = new mongoose.model("Supplier", supplierSchema);
module.exports = supplier;
