const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    code: { type: String, require: true, unique: true },
    mcId: { type: Number, require: true },
    mc: { type: mongoose.Types.ObjectId },
    group: { type: String },
    photo: { type: String },
    description: { type: String },
    status: { type: String, enum: ["active", "inactive"] },
  },
  {
    timestamps: true,
  }
);

const Category = new mongoose.model("Category", categorySchema);
module.exports = Category;
