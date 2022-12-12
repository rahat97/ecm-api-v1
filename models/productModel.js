const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    details: { type: String, require: true },
    category: { type: mongoose.Types.ObjectId, ref: "Category", require: true },
    unit: { type: mongoose.Types.ObjectId, ref: "Unit", require: true },
    photo: { type: String },
    status: { type: String, enum: ["active", "suspend"] },
  },
  {
    timestamps: true,
  }
);
const Product = new mongoose.model("Product", productSchema);
module.exports = Product;
