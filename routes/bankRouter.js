const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Bank = require("../models/bank");

const bankRouter = express.Router();

bankRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const bank = await Bank.find();
        res.send(bank);
        // // res.send('removed');
        console.log(bank);
    })
);

module.exports = bankRouter;