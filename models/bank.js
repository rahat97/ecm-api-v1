const mongoose = require("mongoose");
const bankSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        accountNo: { type: String, require: true },
        address: { type: String, require: true },
        branch: { type: String, require: true },
        swiftCode: { type: String, require: true },
        routingNo: { type: String, require: true },
        status: { type: String, enum: ["active", "suspend"] }
    },
    {
        timestamps: true,
    }
);
const bank = new mongoose.model("Bank", bankSchema);
module.exports = bank;