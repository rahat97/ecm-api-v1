const mongoose = require("mongoose");
const inventoryECMSchema = mongoose.Schema(
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
const inventoryECM = new mongoose.model("inventory", inventoryECMSchema);
module.exports = inventoryECM;