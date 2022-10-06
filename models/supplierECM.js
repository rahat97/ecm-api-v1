const mongoose = require("mongoose");
const supplierECMSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        phoneNumber: { type: String, require: true },
        email: { type: String, require: true },
        address: { type: String, require: true },
        nid: { type: String, require: true },
        company: { type: String, require: true },
        treadLicence: { type: String, require: true },
        status: { type: String, enum: ["active", "inactive"] },
    },
    {
        timestamps: true,
    }
);
const supplierECM = new mongoose.model("supplier", supplierECMSchema);
module.exports = supplierECM;