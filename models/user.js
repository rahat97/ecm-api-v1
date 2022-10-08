const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    {
        admin: { type: String, require: true },
        MD: { type: String, require: true },
        siteManager: { type: String, require: true },
        siteEngineer: { type: String, require: true },
        accounts: { type: String, require: true },
        assAccounts: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);
const user = new mongoose.model("user", userSchema);
module.exports = user;