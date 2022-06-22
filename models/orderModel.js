const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    type: { type: String, require: true },
    address: { type: String },
    phone: { type: String, require: true, unique: true },
    status: { type: String, enum: ["active", "inactive"] },
  },
  {
    timestamps: true,
  }
);

const Order = new mongoose.model("Order", orderSchema);
module.exports = Order;
