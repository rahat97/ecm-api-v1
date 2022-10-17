const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Employee = require("../models/employee");

const employeeRouter = express.Router();

employeeRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const employees = await Employee.find();
        res.send(employees);
        // // res.send('removed');
        console.log(employees);
    })
);

// GET USER BY ID
employeeRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const employee = await Employee.find({ _id: id }).select({
            name: 1,
            email: 1,
            phone: 1,
            address: 1,
            nid: 1,
            designation: 1,
            photo: 1,
            status: 1,
        });
        res.send(employee[0]);
    })
);

// GET USER BY PHONE
employeeRouter.get(
    "/phone/:phone",
    expressAsyncHandler(async (req, res) => {
        const phone = req.params.phone;
        const employee = await Employee.find({ phone: phone });
        res.send(employee);
    })
);

// GET USER BY EMAIL
employeeRouter.get(
    "/email/:email",
    expressAsyncHandler(async (req, res) => {
        const email = req.params.email;
        const employee = await Employee.find({ email: email });
        res.send(employee);
    })
);


employeeRouter.get(
    "/count",
    expressAsyncHandler(async (req, res) => {
        const total = await Employee.countDocuments({});
        res.status(200).json(total);
    })
);

// CREATE ONE Employee
employeeRouter.post(
    "/",
    expressAsyncHandler(async (req, res) => {
        const newEmployee = new Employee(req.body);
        try {
            await newEmployee.save();
            res.status(200).json({
                message: "Employee is created Successfully",
            });
        } catch (err) {
            res
                .status(500)
                .json({ message: "There was a server side error", error: err });
        }
    })
);

// UPDATE ONE Employee
employeeRouter.put(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        // console.log(req.body);
        try {
            await Employee.updateOne({ _id: id }, { $set: update })
                .then((response) => {
                    res.send(response);
                })
                .catch((err) => {
                    res.send(err);
                });
        } catch (error) {
            console.error(error);
        }
    })
);

// DELETE ONE Supplier
employeeRouter.delete(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        try {
            await Employee.deleteOne({ _id: id })
                .then((response) => {
                    res.send(response);
                })
                .catch((err) => {
                    res.send(err);
                });
        } catch (error) {
            console.error(error);
        }
    })
);

module.exports = employeeRouter;