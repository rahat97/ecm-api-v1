const mongoose = require("mongoose");

const tpnSchema = mongoose.Schema(
  {
    tpnNo: { type: String, require: true },
    poNo: { type: mongoose.Types.ObjectId, ref: "Purchase", require: true },
    warehouseTo: { type: mongoose.Types.ObjectId, ref: "Warehouse" },
    warehouseFrom: { type: mongoose.Types.ObjectId, ref: "Warehouse" },
    products: [
      {
        type: Map,
        of: new mongoose.Schema({
          code: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            require: true,
          },
          tp: { type: mongoose.Types.Decimal128, default: 0, require: true },
          mrp: { type: mongoose.Types.Decimal128, default: 0, require: true },
          tax: { type: mongoose.Types.Decimal128, default: 0, require: true },
          qty: { type: mongoose.Types.Decimal128, default: 0, require: true },
          unit: { type: mongoose.Types.ObjectId, ref: "Unit", require: true },
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
    userId: { type: mongoose.Types.ObjectId, ref: "User", require: true },
    status: {
      type: String,
      enum: ["Pending", "Complete"],
    },
  },
  {
    timestamps: true,
  }
);

const Tpn = new mongoose.model("Tpn", tpnSchema);
module.exports = Tpn;
