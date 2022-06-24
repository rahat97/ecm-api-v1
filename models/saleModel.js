const mongoose = require("mongoose");

const saleSchema = mongoose.Schema(
  {
    invoiceId: { type: String, require: true },
    source: { type: String, require: true },
    warhouse: { type: String, require: true },
    products: [
      {
        type: Map,
        of: new mongoose.Schema({
          code: { type: String },
          tp: { type: mongoose.Types.Decimal128, require: true },
          mrp: { type: mongoose.Types.Decimal128, require: true },
          supplier: {
            type: String,
            require: true,
          },
          order: { type: Number, require: true },
          vat: { type: mongoose.Types.Decimal128, require: true },
          qty: { type: mongoose.Types.Decimal128, require: true },
        }),
      },
    ],
    paidAmount: new mongoose.Schema({
      cash: { type: mongoose.Types.Decimal128 },
      mfs: {
        name: { type: String },
        amount: { type: mongoose.Types.Decimal128 },
      },
      card: {
        name: { type: String },
        amount: { type: mongoose.Types.Decimal128 },
      },
    }),
    changeAmount: { type: mongoose.Types.Decimal128, require: true },
    totalItem: { type: Number, require: true },
    total: { type: mongoose.Types.Decimal128, require: true },
    billerId: { type: String },
    customerId: { type: String },
    status: { type: String, enum: ["order", "confirm", "complete"] },
  },
  {
    timestamps: true,
  }
);

const Sale = new mongoose.model("Sale", saleSchema);
module.exports = Sale;
