const mongoose = require("mongoose");
const subContractorSchema = mongoose.Schema(
    {
        name: { type: String },
        phone: { type: String },
        // email: { type: String },
        // address: { type: String },
        nid: { type: String },
        status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);
const subContractor = new mongoose.model("subContractor", subContractorSchema);
module.exports = subContractor;