const mongoose = require("mongoose");
const requisitionSchema = mongoose.Schema(
    {
        sid: { type: String, require: true },
        details: { type: String, require: true },
        title: { type: String, require: true },
        amount: { type: String, require: true },
        manager: { type: String, require: true },
        creationDate: { type: String, require: true },
        executionDate: { type: String, require: true },
        by: { type: String, require: true },
        type: { type: String, require: true },
        status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);
const requisition = new mongoose.model("requisition", requisitionSchema);
module.exports = requisition;