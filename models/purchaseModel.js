const mongoose = require("mongoose");
const purchaseSchema = mongoose.Schema(
    {
        poId : {type : String, require: true},
        // prid: { type: String, require: true },
        reqId: { type: String, require: true },
        user: { type: String, require: true },
        supplier: { type: String, require: true },
        product : [
            {
              type: Map,
              of: new mongoose.Schema({
                id: {
                  type: mongoose.Types.ObjectId,
                  ref: "Product",
                  require: true,
                },
                name: { type: Number, default: 0, require: true },
                order: { type: Number, default: 0, require: true },
                price: { type: Number, default: 0, require: true },
                qty: { type: Number, default: 0, require: true },
                unit: { type: mongoose.Types.ObjectId, ref: "Unit", require: true },
              }),
            },
          ],
        titem: { type: String, require: true },
        gtotal: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);
const purchase = new mongoose.model("purchase", purchaseSchema);
module.exports = purchase;