const mongoose = require("mongoose");
const attendanceSchema = mongoose.Schema(
    {
        project: { type: mongoose.Types.ObjectId, ref: "Project" },
        date: { type: String },
        inTime: { type: String },
        outTime: { type: String},
        eid:{type: String},
        employee: {  type: mongoose.Types.ObjectId, ref: "Employee" },
        status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);
const attendance = new mongoose.model("attendance", attendanceSchema);
module.exports = attendance;