const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Purchase = require("../models/purchaseModel");

const purchaseRouter = express.Router();

//GET ALL purchase
purchaseRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const purchase = await Purchase.find({});
        res.send(purchase);
        // // res.send('removed');
        console.log(purchase);
    })
);

// GET Purchase by id
purchaseRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const purchase = await Purchase.find({ _id: id });
        res.send(purchase[0]);
    })
);

// CREATE ONE Purchase
purchaseRouter.post(
    "/",
    expressAsyncHandler(async (req, res) => {
        const newPurchase = new Purchase(req.body);
        try {
            await newPurchase.save();
            res.status(200).json({
                message: "Purchase is created Successfully",
            });
        } catch (err) {
            res
                .status(500)
                .json({ message: "There was a server side error", error: err });
        }
    })
);

// UPDATE ONE Purchase
purchaseRouter.put(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        // console.log(req.body);
        try {
            await Purchase.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE Purchase
purchaseRouter.delete(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        try {
            await Purchase.deleteOne({ _id: id })
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

module.exports = purchaseRouter;