const mongoose = require("mongoose");
const inventorySchema = mongoose.Schema(
  {
    ProjectId: { type: mongoose.Types.ObjectId, ref: "Project", require: true },
    material: { type: mongoose.Types.ObjectId, ref: "Product", require: true },
    totalStock: { type: String, require: true },
    currentStock: { type: String, require: true },
    stockOut: { type: String, require: true },
    damageStock: { type: String, require: true },
    type: { type: String, enum: ["in", "out"] },
    status: { type: String, enum: ["active", "suspend"] },
  },
  {
    timestamps: true,
  }
);
const inventory = new mongoose.model("inventory", inventorySchema);
module.exports = inventory;

/**
 * calculation:
 * Stock In:  total (+), current (+)
 * Stock Out: current (-), stockOut (+)
 * Damage:
 * */
