const mongoose = require("mongoose");

const priceSchema = mongoose.Schema(
  {
    product: { type: mongoose.Types.ObjectId, require: true },
    supplier: { type: mongoose.Types.ObjectId, require: true },
    tp: { type: mongoose.Types.Decimal128, require: true },
    mrp: { type: mongoose.Types.Decimal128, require: true },
    status: { type: String, enum: ["active", "inactive"] },
  },
  {
    timestamps: true,
  }
);

const Price = new mongoose.model("Price", priceSchema);
module.exports = Price;
