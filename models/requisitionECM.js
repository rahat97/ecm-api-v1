const mongoose = require("mongoose");
const requisitionECMSchema = mongoose.Schema(
    {
        sid: { type: String, require: true },
        details: { type: String, require: true },
        title: { type: String, require: true },
        amount: { type: String, require: true },
        manager: { type: String, require: true },
        creationDate: { type: String, require: true },
        executionDate: { type: String, require: true },
        by: { type: String, require: true },
        // type: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);
const requisitionECM = new mongoose.model("requisition", requisitionECMSchema);
module.exports = requisitionECM;