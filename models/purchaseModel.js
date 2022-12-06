const mongoose = require("mongoose");
const purchaseSchema = mongoose.Schema(
    {
        poNo: { type: String, require: true },
        byUser: { type: String, require: true },
        date: { type: String, require: true },
        totalItem: { type: String, require: true },
        products: [
            {
                type: Map,
                of: new mongoose.Schema({
                    id: {
                        type: mongoose.Types.ObjectId,
                        ref: "Product",
                        require: true,
                    }
                }),
            },
        ],
        note: { type: String },
        status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);
const purchase = new mongoose.model("purchase", purchaseSchema);
module.exports = purchase;