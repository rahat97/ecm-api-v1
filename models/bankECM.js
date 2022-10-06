const mongoose = require("mongoose");
const bankECMSchema = mongoose.Schema(
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
const bankECM = new mongoose.model("bank", bankECMSchema);
module.exports = bankECM;