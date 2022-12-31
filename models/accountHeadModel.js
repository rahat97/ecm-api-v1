const mongoose = require("mongoose");
const accountHeadSchema = mongoose.Schema(
    {
        name: { type: String },
        details: { type: String },
        type: { type: String },
        // code: { type: String, require: true, unique: true },
        status: { type: String, enum: ["active", "suspend"] }
    },
    {
        timestamps: true,
    }
);
const accountHead = new mongoose.model("AccountHead", accountHeadSchema);
module.exports = accountHead;