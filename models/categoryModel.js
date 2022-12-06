const mongoose = require("mongoose");
const categorySchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        details: { type: String, require: true },
        parent: { type: String, require: true },
        status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);
const category = new mongoose.model("category", categorySchema);
module.exports = category;