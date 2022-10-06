const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Client = require("../models/clientsECM");

const clientRouter = express.Router();

clientRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const client = await Client.find({ status: "active" });
        res.send(client);
        // // res.send('removed');
        console.log(client);
    })
);

module.exports = clientRouter;