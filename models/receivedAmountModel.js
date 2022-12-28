const mongoose = require("mongoose");
const receivedAmountSchema = mongoose.Schema(
    {
        slNo: { type: String, require: true },
        date: { type: String, require: true },
        accHead: { type: String, require: true },
        details: { type: String, require: true },
        amount: { type: String, require: true },
        type: { type: String, require: true },
        chequeNo: { type: String, require: true },
        bank: { type: String, require: true },
        particular: { type: String, require: true },
        status: { type: String, enum: ["active", "suspend"] }
    },
    {
        timestamps: true,
    }
);
const receivedAmount = new mongoose.model("receivedAmount", receivedAmountSchema);
module.exports = receivedAmount;