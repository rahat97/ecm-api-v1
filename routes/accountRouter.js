const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Account = require("../models/accounts");

const accountRouter = express.Router();

accountRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const account = await Account.find({ status: "active" });
        res.send(account);
        // // res.send('removed');
        console.log(account);
    })
);

module.exports = accountRouter;