const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Requisition = require("../models/requisition");

const requisitionRouter = express.Router();

requisitionRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const requisition = await Requisition.find({ status: "active" });
        res.send(requisition);
        // // res.send('removed');
        console.log(requisition);
    })
);

module.exports = requisitionRouter;