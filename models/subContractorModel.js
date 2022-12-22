const mongoose = require("mongoose");
const subContractorSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        phone: { type: String, require: true },
        email: { type: String, require: true },
        address: { type: String, require: true },
        nid: { type: String, require: true },
        status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);
const subContractor = new mongoose.model("subContractor", subContractorSchema);
module.exports = subContractor;