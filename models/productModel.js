const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    ean: { type: String },
    article_code: { type: String, require: true },
    master_category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    product_type: { type: String, enum: ["standard", "combo", "offer"] },
    priceList: [
      {
        type: mongoose.Types.ObjectId, //HERE
        ref: "Price",
      },
    ],
    brand: { type: String, require: true },
    slug: { type: String, require: true },
    details: { type: String },
    specification: { type: String },
    promo_price: { type: String },
    promo_start: { type: data },
    promo_end: { type: date },
    unit: { type: String, require: true },
    alert_quantity: { type: Number, require: true },
    vat: { type: Number, require: true },
    vat_method: { type: Boolean, require: true },
    featured: { type: Boolean, require: true },
    shipping_method: { type: String, require: true },
    hide_website: { type: Boolean, require: true },
    photo: { type: String, require: true },
    status: { type: String, enum: ["active", "inactive"] },
  },
  {
    timestamps: true,
  }
);

const Product = new mongoose.model("Product", productSchema);

productSchema.method = {
  findActive: function () {
    return mongoose.model("Product");
  },
};

module.exports = Product;
