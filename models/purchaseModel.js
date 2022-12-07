const mongoose = require("mongoose");
const purchaseSchema = mongoose.Schema(
    {
        prid: { type: String, require: true },
        reqid: { type: String, require: true },
        user: { type: String, require: true },
        product: { type: String, require: true },
        titem: { type: String, require: true },
        gtotal: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);
const purchase = new mongoose.model("purchase", purchaseSchema);
module.exports = purchase;