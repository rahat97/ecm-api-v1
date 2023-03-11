const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Dashboard = require("../models/dashboardModel");

const dashboardRouter = express.Router();


//GET ALL CLIENT 
dashboardRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const dashboard = await Dashboard.find();
        res.send(dashboard);
        // // res.send('removed');
        console.log(dashboard);
    })
);

//GET DASHBOARD COUNT
dashboardRouter.get(
    "/count",
    expressAsyncHandler(async (req, res) => {
        const total = await Dashboard.countDocuments({});
        // console.log("id");
        res.status(200).json(total);
    })
);


// GET ONE dashboard BY ID
dashboardRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const dashboard = await Dashboard.find({ _id: id, status: "active" });
        res.send(dashboard[0]);
        // // res.send('removed');
        // console.log(client);
    })
);

// CREATE ONE Dashboard
dashboardRouter.post(
    "/",
    expressAsyncHandler(async (req, res) => {
        const newDashboard = new Dashboard(req.body);
        try {
            await newDashboard.save((err, dashboard) => {
                if (err) {
                    res
                        .status(500)
                        .json({ message: "There was a server side error", error: err });
                } else {
                    res.status(200).json({
                        message: "Dashboard is created Successfully",
                        id: dashboard._id,
                    });
                }
            });
        } catch (err) {
            res
                .status(500)
                .json({ message: "There was a server side error", error: err });
        }
    })
);

// CREATE MULTI Dashboard
dashboardRouter.post(
    "/all",
    expressAsyncHandler(async (req, res) => {
        await Dashboard.insertMany(req.body, (err) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({
                    message: "Dashboard are created Successfully",
                });
            }
        });
    })
);

// UPDATE ONE Dashboard
dashboardRouter.put(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        try {
            await Dashboard.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE dashboard
dashboardRouter.delete(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        try {
            await Dashboard.deleteOne({ _id: id })
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



module.exports = dashboardRouter;