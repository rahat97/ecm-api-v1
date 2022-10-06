const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Project = require("../models/projectsECM");

const projectRouter = express.Router();

projectRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const projects = await Project.find({ status: "active" });
        res.send(projects);
        // // res.send('removed');
        console.log(projects);
    })
);

module.exports = projectRouter;