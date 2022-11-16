const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const AccountHead = require("../models/accountHeadModel");

const accountHeadRouter = express.Router();

accountHeadRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const accountHead = await AccountHead.find();
        res.send(accountHead);
        // // res.send('removed');
        console.log(accountHead);
    })
);

// CREATE ONE BANK
accountHeadRouter.post(
    "/",
    expressAsyncHandler(async (req, res) => {
        const accountHead = new AccountHead(req.body);
        try {
            await accountHead.save();
            res.status(200).json({
                message: "Account Head is created Successfully",
            });
        } catch (err) {
            res
                .status(500)
                .json({ message: "There was a server side error", error: err });
        }
    })
);

accountHeadRouter.put(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        // console.log(req.body);
        try {
            await AccountHead.updateOne({ _id: id }, { $set: update })
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

accountHeadRouter.delete(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        try {
            await AccountHead.deleteOne({ _id: id })
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

module.exports = accountHeadRouter;