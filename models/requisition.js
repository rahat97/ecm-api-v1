const mongoose = require("mongoose");
const requisitionSchema = mongoose.Schema(
    {
        // prid: { type: mongoose.Types.ObjectId, ref: "Project", require: true },
        reqId : {type : String, require: true},
        date: { type: String },
        product: [
            {
              type: Map,
              of: new mongoose.Schema({
                id: {
                  type: mongoose.Types.ObjectId,
                  ref: "Product",
                  require: true,
                },
               name:{type:String,require:true},
               unit:{type:String,require:true},
               qty:{type:Number,require:true},
                order: { type: Number, require: true },
              }),
            },
          ],
        note: { type: String},
        by: { type: String, require: true },
        status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);
const requisition = new mongoose.model("Requisition", requisitionSchema);
module.exports = requisition;