const mongoose = require("mongoose");
const accountSchema = mongoose.Schema(
    {
        expense: { type: String, require: true },
        purchase: { type: String, require: true },
        payment: { type: String, require: true },
        salary: { type: String, require: true },
        payroll: { type: String, require: true },
        cPayment: { type: String, require: true },
        OPC: { type: String, require: true },
        investment: { type: String, require: true },
        status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);
const account = new mongoose.model("account", accountSchema);
module.exports = account;