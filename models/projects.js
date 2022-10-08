const mongoose = require("mongoose");
const projectSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        client: { type: String, require: true },
        location: { type: String, require: true },
        details: { type: String, require: true },
        budgets: { type: String, require: true },
        stuff: { type: String, require: true },
        projectManager: { type: String, require: true },
        duration: { type: String, require: true },
        workOrder: { type: String, require: true },
        manager: { type: String, require: true },
        engineer: { type: String, require: true },
        stuff: { type: String, require: true },
        subContructor: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);
const project = new mongoose.model("project", projectSchema);
module.exports = project;