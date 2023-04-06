const mongoose = require("mongoose");
const damageSchema = mongoose.Schema(
  {
    
    dmgId: { type: String, require: true },
    date: { type: String },
    by: { type: String },
    totalQty: { type: String },
    product: [
      {
        type: Map,
        of: new mongoose.Schema({
          id: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            require: true,
          },
          name: { type: String, require: true },
          unit: { type: String, require: true },
          qty: { type: Number, require: true },
          order: { type: Number, require: true },
        }),
      },
    ],
    reason: { type: String },    
    status: { type: String, enum: ["active", "suspend"] },
  },
  {
    timestamps: true,
  }
);
const damage = new mongoose.model("Damage", damageSchema);
module.exports = damage;
