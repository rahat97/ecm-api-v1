const mongoose = require("mongoose");
const testSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        phone: { type: String, require: true },
        email: { type: String, require: true },
        address: { type: String, require: true },
        status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);
const test = new mongoose.model("test", testSchema);
module.exports = test;