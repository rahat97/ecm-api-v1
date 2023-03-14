const mongoose = require("mongoose");
const accountExpenditureSchema = mongoose.Schema(
    {
        accExpId: { type: String, require: true },
        date: { type: Date },
        accountHead: { type: mongoose.Types.ObjectId, ref: "AccountHead" },
        details: { type: String },
        responsiblePerson: { type: mongoose.Types.ObjectId, ref: "User" },
        paidTo: { type: String },
        bank: { type: mongoose.Types.ObjectId, ref: "Bank", sparse: true, default: null },
        projectName: { type: mongoose.Types.ObjectId, ref: "Project" },
        type: { type: String, require: true },
        txid: { type: String,},
        phone: { type: String, },
        cardtype: { type: String, },
        chequeNo: { type: String },
        mfsName: { type: String },
        amount: { type: String, require: true },
        status: { type: String, enum: ["active", "suspend"] }
    },
    {
        timestamps: true,
    }
);
const accountExpenditure = new mongoose.model("AccountExpenditure", accountExpenditureSchema);
module.exports = accountExpenditure;