const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, unique: true, sparse: true },
    username: { type: String },
    password: { type: String },
    membership: { type: String, unique: true },
    address: { type: String },
    type: { type: String },
    point: { type: Number, default: 0 },
    phone: { type: String, require: true, unique: true },
    status: { type: String, enum: ["active", "inactive"] },
  },
  {
    timestamps: true,
  }
);

const Customer = new mongoose.model("Customer", customerSchema);
module.exports = Customer;
