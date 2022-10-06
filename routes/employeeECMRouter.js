const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Employee = require("../models/employeeECM");

const employeeRouter = express.Router();

employeeRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const employees = await Employee.find({ status: "active" });
        res.send(employees);
        // // res.send('removed');
        console.log(employees);
    })
);

module.exports = employeeRouter;