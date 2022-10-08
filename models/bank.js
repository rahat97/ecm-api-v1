const mongoose = require("mongoose");
const bankSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        accountno: { type: String, require: true },
        address: { type: String, require: true },
        branch: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);
const bank = new mongoose.model("bank", bankSchema);
module.exports = bank;