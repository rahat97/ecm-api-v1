const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Requisition = require("../models/requisition");

const requisitionRouter = express.Router();

requisitionRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const requisition = await Requisition.find();
        res.send(requisition);
        // // res.send('removed');
        console.log(requisition);
    })
);

// GET USER BY ID
requisitionRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const requisition = await Requisition.find({ _id: id }).select({
            sid: 1,
            details: 1,
            title: 1,
            amount: 1,
            manager: 1,
            creationDate: 1,
            executionDate: 1,
            by: 1,
        });
        res.send(requisition[0]);
    })
);

// CREATE ONE Supplier
requisitionRouter.post(
    "/",
    expressAsyncHandler(async (req, res) => {
        const newRequisition = new Requisition(req.body);
        try {
            await newRequisition.save();
            res.status(200).json({
                message: "Supplier is created Successfully",
            });
        } catch (err) {
            res
                .status(500)
                .json({ message: "There was a server side error", error: err });
        }
    })
);

requisitionRouter.put(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        // console.log(req.body);
        try {
            await Requisition.updateOne({ _id: id }, { $set: update })
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
requisitionRouter.delete(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        try {
            await Requisition.deleteOne({ _id: id })
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



module.exports = requisitionRouter;