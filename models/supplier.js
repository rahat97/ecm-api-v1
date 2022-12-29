const mongoose = require("mongoose");
const supplierSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        phone: { type: String, require: true },
        email: { type: String, require: true },
        address: { type: String, require: true },
        nid: { type: String, require: true },
        company: { type: String, require: true },
        tradeLicense: { type: String, require: true },
        status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);
const supplier = new mongoose.model("supplier", supplierSchema);
module.exports = supplier;