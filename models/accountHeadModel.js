const mongoose = require("mongoose");
const accountHeadSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        code: { type: String, require: true, unique: true },
        status: { type: String, enum: ["active", "suspend"] }
    },
    {
        timestamps: true,
    }
);
const accountHead = new mongoose.model("accountHead", accountHeadSchema);
module.exports = accountHead;