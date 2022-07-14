const mongoose = require("mongoose");

const priceSchema = mongoose.Schema(
  {
    article_code: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      require: true,
    },
    supplier: { type: mongoose.Types.ObjectId, ref: "Supplier", require: true },
    warehouse: {
      type: mongoose.Types.ObjectId,
      ref: "Warehouse",
      require: true,
    },
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
