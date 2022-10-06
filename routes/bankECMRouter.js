const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Bank = require("../models/bankECM");

const bankRouter = express.Router();

bankRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const bank = await Bank.find({ status: "active" });
        res.send(bank);
        // // res.send('removed');
        console.log(bank);
    })
);

module.exports = bankRouter;