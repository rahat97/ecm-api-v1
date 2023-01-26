const mongoose = require("mongoose");
const grnSchema = mongoose.Schema(
    {
        po: { type: String, require: true },
        productName: { type: String, require: true },
        date: { type: String, require: true },
        by: { type: String, require: true },
        item: { type: String, require: true },
        total: { type: String, require: true },
        status: { type: String, enum: ["active", "suspend"] }
    },
    {
        timestamps: true,
    }
);
const grn = new mongoose.model("grn", grnSchema);
module.exports = grn;