const mongoose = require("mongoose");
const receivedAmountSchema = mongoose.Schema(
    {
        // slNo: { type: String, require: true },
        recvAmntId : { type: String, require: true },
        date: { type: String, require: true },
        // accHead: { type: String, require: true },
        details: { type: String },
        amount: { type: String, require: true },
        type: { type: String, require: true },
        chequeNo: { type: String },
        bank: { type: mongoose.Types.ObjectId, ref: "Bank" },
        particular: { type: String },
        status: { type: String, enum: ["active", "suspend"] }
    },
    {
        timestamps: true,
    }
);
const receivedAmount = new mongoose.model("ReceivedAmount", receivedAmountSchema);
module.exports = receivedAmount;