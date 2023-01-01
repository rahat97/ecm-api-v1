const mongoose = require("mongoose");
const accountHeadSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        details: { type: String, require: true },
        type: { type: String, enum: ["cash", "cheque", "mfs", "card"] },
        // code: { type: String, require: true, unique: true },
        status: { type: String, enum: ["active", "suspend"] }
    },
    {
        timestamps: true,
    }
);
const accountHead = new mongoose.model("AccountHead", accountHeadSchema);
module.exports = accountHead;