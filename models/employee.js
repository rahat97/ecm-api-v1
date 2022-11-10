const mongoose = require("mongoose");
const employeeSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        phone: { type: String, require: true },
        email: { type: String, require: true },
        address: { type: String, require: true },
        nid: { type: String, require: true },
        designation: { type: String, require: true },
        photo: { type: String },
        type: { type: String },
        status: { type: String, enum: ["active", "suspend"] },
    },
    {
        timestamps: true,
    }
);

const employee = new mongoose.model("employee", employeeSchema);
module.exports = employee;