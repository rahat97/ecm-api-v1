const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    type: { type: String, require: true },
    address: { type: String },
    phone: { type: String, require: true, unique: true },
    membership_card_no: { type: String },
    points: { type: Number },
    offers: { type: String },
    status: { type: String, enum: ["active", "inactive"] },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("User", userSchema);
module.exports = User;
