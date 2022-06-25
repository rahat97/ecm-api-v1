const mongoose = require("mongoose");

const damageSchema = mongoose.Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: "Product", require: true },
    warehouse: {
      type: mongoose.Types.ObjectId,
      ref: "Warehouse",
      require: true,
    },
    qty: { type: Number, require: true },
    reason: { type: String },
    userId: { type: mongoose.Types.ObjectId, ref: "User", require: true },
    status: {
      type: String,
      enum: ["active", "inactive"],
    },
  },
  {
    timestamps: true,
  }
);

const Damage = new mongoose.model("Damage", damageSchema);
module.exports = Damage;
