const mongoose = require("mongoose");
const paymentSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        phone: { type: String, require: true },
        details: { type: String, require: true },
        status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);
const payment = new mongoose.model("payment", paymentSchema);
module.exports = payment;