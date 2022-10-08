const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Inventory = require("../models/inventory");

const inventoryRouter = express.Router();

inventoryRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const inventories = await Inventory.find({ status: "active" });
        res.send(inventories);
        // // res.send('removed');
        console.log(inventories);
    })
);

module.exports = inventoryRouter;