const mongoose = require("mongoose");
const accountECMSchema = mongoose.Schema(
    {
        expense: { type: String, require: true },
        purchase: { type: String, require: true },
        payment: { type: String, require: true },
        salary: { type: String, require: true },
        payroll: { type: String, require: true },
        cPayment: { type: String, require: true },
        OPC: { type: String, require: true },
        investment: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);
const accountECM = new mongoose.model("account", accountECMSchema);
module.exports = accountECM;