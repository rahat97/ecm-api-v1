const mongoose = require("mongoose");
const bankSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        accountNo: { type: String, require: true },
        address: { type: String, require: true },
        branch: { type: String, require: true },
        status: { type: String, enum: ["active", "suspend"] }
    },
    {
        timestamps: true,
    }
);
const bank = new mongoose.model("bank", bankSchema);
module.exports = bank;