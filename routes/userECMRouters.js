const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userECM");

const userRouter = express.Router();

userRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const user = await User.find({ status: "active" });
        res.send(user);
        // // res.send('removed');
        console.log(user);
    })
);

module.exports = userRouter;