const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const AccountHead = require("../models/accountHeadModel");

const accountHeadRouter = express.Router();

accountHeadRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const accountHead = await AccountHead.find({}).select({
            _id: 1,
            name: 1,
            details: 1,
            type: 1,
            status: 1,
        });
        res.send(accountHead);
        // // res.send('removed');
        console.log(accountHead);
    })
);
accountHeadRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        console.log(id)
        const accountHead = await AccountHead.find({_id : id}).select({
            _id: 1,
            name: 1,
            details: 1,
            type: 1,
            status: 1,
        });
        console.log("head", accountHead);
        res.send(accountHead[0]);
        // // res.send('removed');
    })
);

// CREATE ONE AccountHead
accountHeadRouter.post(
    "/",
    expressAsyncHandler(async (req, res) => {
        console.log(req.body);
        const newaccountHead = new AccountHead(req.body);
        console.log(newaccountHead)
        try {
           await newaccountHead.save().then(result=>{
            console.log(result.data)
            res.status(200).json({
                message: "AccountHead is created successfully",
            });
           });
        } catch (err) {
            res
                .status(500)
                .json({ message: "There was a server side error", error: err });
        }
    })
);

// Update AccountHead
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


//DELETE AccountHead

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