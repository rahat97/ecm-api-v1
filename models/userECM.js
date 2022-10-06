const mongoose = require("mongoose");
const userECMSchema = mongoose.Schema(
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
const userECM = new mongoose.model("user", userECMSchema);
module.exports = userECM;