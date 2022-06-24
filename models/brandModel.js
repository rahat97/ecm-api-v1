const mongoose = require("mongoose");

const brandSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    comapny: { type: String, require: true },
    photo: { type: String },
    status: { type: String, enum: ["active", "inactive"] },
  },
  {
    timestamps: true,
  }
);

const Brand = new mongoose.model("Brand", brandSchema);
module.exports = Brand;
