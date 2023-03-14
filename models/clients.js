const mongoose = require("mongoose");
const clientsSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String },
    address: { type: String },
    nid: { type: String },
    designation: { type: String, require: true },
    company: { type: String },
    tradeLicense: { type: String },
    // photo: { type: String },
    // type: { type: String },
    status: { type: String, enum: ["active", "suspend"] },
  },
  {
    timestamps: true,
  }
);

const clients = new mongoose.model("Client", clientsSchema);
module.exports = clients;
