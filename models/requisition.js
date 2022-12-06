const mongoose = require("mongoose");
const requisitionSchema = mongoose.Schema(
    {
        prid: { type: String, require: true },
        date: { type: String, require: true },
        product: { type: String, require: true },
        note: { type: String, require: true },
        // manager: { type: String, require: true },
        // creationDate: { type: String, require: true },
        // executionDate: { type: String, require: true },
        // by: { type: String, require: true },
        // type: { type: String, require: true },
        // status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);
const requisition = new mongoose.model("requisition", requisitionSchema);
module.exports = requisition;