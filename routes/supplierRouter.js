const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Supplier = require("../models/supplier");

const SupplierRouter = express.Router();

SupplierRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const supplier = await Supplier.find({ status: "active" });
        res.send(supplier);
        // // res.send('removed');
        console.log(supplier);
    })
);

module.exports = SupplierRouter;