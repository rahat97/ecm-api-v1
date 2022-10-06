const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Attendence = require("../models/attendenceECM");

const attendenceRouter = express.Router();

attendenceRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const attendence = await Attendence.find({ status: "active" });
        res.send(attendence);
        // // res.send('removed');
        console.log(attendence);
    })
);

module.exports = attendenceRouter;