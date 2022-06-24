const mongoose = require("mongoose");

const inventoryCountSchema = mongoose.Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: "Product", require: true },
    warehouse: {
      type: mongoose.Types.ObjectId,
      ref: "Warehouse",
      require: true,
    },
    qty: { type: mongoose.Types.Decimal128, require: true },
    inventoryBy: { type: mongoose.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["active", "inactive"] },
  },
  {
    timestamps: true,
  }
);

const InventoryCount = new mongoose.model(
  "InventoryCount",
  inventoryCountSchema
);
module.exports = InventoryCount;
