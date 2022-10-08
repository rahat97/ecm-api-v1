const mongoose = require("mongoose");
const attendenceSchema = mongoose.Schema(
    {
        project: { type: String, require: true },
        date: { type: String, require: true },
        inTime: { type: String, require: true },
        outTime: { type: String, require: true },
        eid: { type: String, require: true },
        status: { type: String, enum: ["active", "inactive"] },
    },
    {
        timestamps: true,
    }
);
const attendence = new mongoose.model("attendence", attendenceSchema);
module.exports = attendence;