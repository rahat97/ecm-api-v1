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
        type: { type: String, enum: ["admin", "md", "site_manager", "site_ngineer", "accounts", "assistant_accounts", "project_manager", "project_engineer", "project_accounts"] },
        // photo: { type: String },
        status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);
const user = new mongoose.model("User", userSchema);
module.exports = user;