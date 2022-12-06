const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        username: { type: String, require: true },
        phone: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
        address: { type: String, require: true },
        nid: { type: String, require: true },
        type: { type: String, enum: ["admin", "MD", "Site Manager", "Site Engineer", "Accounts", "Assistant Accounts"] },
        photo: { type: String },
        status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);
const user = new mongoose.model("user", userSchema);
module.exports = user;