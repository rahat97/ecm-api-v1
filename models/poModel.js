const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema(
  {
    poNo: { type: String, require: true },
    supplier: { type: String, require: true },
    warehouse: { type: String, require: true, unique: true },
    products: [
      {
        type: Map,
        of: new mongoose.Schema({
          id: { type: mongoose.Types.ObjectId, ref: "Product", require: true },
          tp: { type: mongoose.Types.Decimal128, default: 0, require: true },
          mrp: { type: mongoose.Types.Decimal128, default: 0, require: true },
          tax: { type: mongoose.Types.Decimal128, default: 0, require: true },
          discount: {
            type: mongoose.Types.Decimal128,
            default: 0,
            require: true,
          },
          order: { type: Number, require: true },
        }),
      },
    ],
    type: { type: String },
    note: { type: String },
    doc: { type: String },
    totalItem: { type: Number, default: 0, require: true },
    total: { type: mongoose.Types.Decimal128, default: 0, require: true },
    discount: { type: mongoose.Types.Decimal128, default: 0, require: true },
    tax: { type: mongoose.Types.Decimal128, default: 0, require: true },
    status: {
      type: String,
      enum: ["Pending", "Ordered", "Partial", "Recieved"],
    },
  },
  {
    timestamps: true,
  }
);

const Supplier = new mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;
