const mongoose = require("mongoose");
const bankSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    accountNo: { type: String, require: true },
    address: { type: String },
    branch: { type: String, require: true },
    swiftCode: { type: String },
    routingNo: { type: String },
    status: { type: String, enum: ["active", "suspend"] },
  },
  {
    timestamps: true,
  }
);
const bank = new mongoose.model("Bank", bankSchema);
module.exports = bank;
