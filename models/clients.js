const mongoose = require("mongoose");
const clientsSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        phone: { type: String, require: true },
        email: { type: String, require: true },
        address: { type: String, require: true },
        nid: { type: String, require: true },
        designation: { type: String, require: true },
        company: { type: String, require: true },
        tradeLicense: { type: String, require: true },
        // photo: { type: String },
        // type: { type: String },
        status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);

const clients = new mongoose.model("client", clientsSchema);
module.exports = clients;