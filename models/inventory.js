const mongoose = require("mongoose");
const inventorySchema = mongoose.Schema(
    {
        pid: { type: String, require: true },
        item: { type: String, require: true },
        qty: { type: String, require: true },
        date: { type: String, require: true },
        nid: { type: String, require: true },
        cid: { type: String, require: true },
        type: { type: String, enum: ["in", "out"] },
    },
    {
        timestamps: true,
    }
);
const inventory = new mongoose.model("inventory", inventorySchema);
module.exports = inventory;