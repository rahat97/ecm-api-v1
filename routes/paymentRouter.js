const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
const {generatePaymentId} = require("../middlewares/generateId");

const paymentRouter = express.Router();

//GET ALL payment
paymentRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const payment = await Payment.find({});
        res.send(payment);
        // // res.send('removed');
        console.log(payment);
    })
);

// GET Payment by id
paymentRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const payment = await Payment.find({ _id: id }).select({
            name: 1,
            phone: 1,
            details: 1,
            status: 1,
            
        });
        res.send(payment[0]);
    })
);

// CREATE ONE Payment
paymentRouter.post(
    "/",
    generatePaymentId,
    expressAsyncHandler(async (req, res) => {
        const newPayment = new Payment(req.body);
        try {
            await newPayment.save();
            res.status(200).json({
                message: "Payment is created Successfully",
            });
        } catch (err) {
            res
                .status(500)
                .json({ message: "There was a server side error", error: err });
        }
    })
);

// UPDATE ONE Payment
paymentRouter.put(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        // console.log(req.body);
        try {
            await Payment.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE Payment
paymentRouter.delete(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        try {
            await Payment.deleteOne({ _id: id })
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

module.exports = paymentRouter;