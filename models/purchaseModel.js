const mongoose = require("mongoose");
const purchaseSchema = mongoose.Schema(
  {
    poId: { type: String, require: true },
    invoiceNo: { type: String },
    reqId: { type: String, require: true },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    supplier: { type: mongoose.Types.ObjectId, ref: "Supplier" },
    product: [
      {
        type: Map,
        of: new mongoose.Schema({
          id: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            require: true,
          },
          name: { type: Number, default: 0, require: true },
          order: { type: Number, default: 0, require: true },
          price: { type: Number, default: 0, require: true },
          qty: { type: Number, default: 0, require: true },
          total: { type: Number, default: 0 },
          unit: { type: mongoose.Types.ObjectId, ref: "Unit", require: true },
        }),
      },
    ],
    titem: { type: String, require: true },
    gtotal: { type: String, require: true },
    shippingcost: { type: String },
  },
  {
    timestamps: true,
  }
);
const purchase = new mongoose.model("purchase", purchaseSchema);
module.exports = purchase;
