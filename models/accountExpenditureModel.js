const mongoose = require("mongoose");
const accountExpenditureSchema = mongoose.Schema(
    {
        date: { type: Date, require: true },
        accountHead: { type: String, require: true },
        details: { type: String, require: true },
        responsiblePerson: { type: String, require: true },
        paidTo: { type: String, require: true },
        projectName: { type: String, require: true },
        type: { type: String, require: true },
        chequeNo: { type: String, require: true },
        status: { type: String, enum: ["active", "suspend"] }
    },
    {
        timestamps: true,
    }
);
const accountExpenditure = new mongoose.model("accountExpenditure", accountExpenditureSchema);
module.exports = accountExpenditure;