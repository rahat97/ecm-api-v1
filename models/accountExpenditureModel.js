const mongoose = require("mongoose");
const accountExpenditureSchema = mongoose.Schema(
    {
        date: { type: Date },
        accountHead: { type: mongoose.Types.ObjectId, ref: "AccountHead" },
        details: { type: String, require: true },
        responsiblePerson: { type: mongoose.Types.ObjectId, ref: "User" },
        paidTo: { type: String, require: true },
        projectName: { type: mongoose.Types.ObjectId, ref: "Project" },
        type: { type: String, require: true },
        chequeNo: { type: String },
        status: { type: String, enum: ["active", "suspend"] }
    },
    {
        timestamps: true,
    }
);
const accountExpenditure = new mongoose.model("accountExpenditure", accountExpenditureSchema);
module.exports = accountExpenditure;