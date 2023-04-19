const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Supplier = require("../models/supplier");

const supplierRouter = express.Router();

supplierRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const supplier = await Supplier.find();
        res.send(supplier);
        // // res.send('removed');
        console.log(supplier);
    })
);

// GET USER BY ID
supplierRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const supplier = await Supplier.find({ _id: id }).select({
            name: 1,
            email: 1,
            address: 1,
            nid: 1,
            phone: 1,
            company: 1,
            status: 1,
            tradeLicense: 1,
        });
        res.send(supplier[0]);
    })
);

// GET USER BY PHONE
supplierRouter.get(
    "/phone/:phone",
    expressAsyncHandler(async (req, res) => {
        const phone = req.params.phone;
        const supplier = await Supplier.find({ phone: phone });
        res.send(supplier);
    })
);
// GET USER BY EMAIL
supplierRouter.get(
    "/email/:email",
    expressAsyncHandler(async (req, res) => {
        const email = req.params.email;
        const supplier = await Supplier.find({ email: email });
        res.send(supplier);
    })
);

supplierRouter.get(
    "/count",
    expressAsyncHandler(async (req, res) => {
        const total = await Supplier.countDocuments({});
        res.status(200).json(total);
    })
);

// CREATE ONE Supplier
supplierRouter.post(
    "/",
    expressAsyncHandler(async (req, res) => {
        const newSupplier = new Supplier(req.body);
        try {
            await newSupplier.save((err, supplier) => {
                if (err) {
                  res
                    .status(500)
                    .json({ message: "There was a server side error", error: err });
                } else {
                  console.log(supplier);
                  res.status(200).json({
                    message: "Supplier is created Successfully",
                    id: supplier._id,
                  });
                }
              });
           
        } catch (err) {
            res
                .status(500)
                .json({ message: "There was a server side error", error: err });
        }
    })
);

// CREATE MULTI suppliers
supplierRouter.post(
    "/all",
    expressAsyncHandler(async (req, res) => {
        await Supplier.insertMany(req.body, (err) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({
                    message: "suppliers are created Successfully",
                });
            }
        });
    })
);

// UPDATE ONE Supplier
supplierRouter.put(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        // console.log(req.body);
        try {
            await Supplier.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE Supplier
supplierRouter.delete(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        try {
            await Supplier.deleteOne({ _id: id })
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

module.exports = supplierRouter;