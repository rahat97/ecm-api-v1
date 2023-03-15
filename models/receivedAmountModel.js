const mongoose = require("mongoose");
const receivedAmountSchema = mongoose.Schema(
  {
    // slNo: { type: String, require: true },
    // recvAmntId: { type: String, require: true },
    date: { type: String, require: true },
    // accHead: { type: String, require: true },
    project: { type: mongoose.Types.ObjectId, ref: "Project" },
    details: { type: String },
    amount: { type: String, require: true },
    type: { type: String },
    phone: { type: String },
    txid: { type: String },
    cardtype: { type: String },
    chequeNo: { type: String },
    bank: { type: mongoose.Types.ObjectId, ref: "Bank" },
    mfsName: { type: String },
    particular: { type: String },
    individual: { type: String },
    status: { type: String, enum: ["active", "suspend"] },
  },
  {
    timestamps: true,
  }
);
const receivedAmount = new mongoose.model(
  "ReceivedAmount",
  receivedAmountSchema
);
module.exports = receivedAmount;
