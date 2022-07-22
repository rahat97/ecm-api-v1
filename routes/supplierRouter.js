/**
 * Suppliers API
 * 1. get all Suppliers
 * 2. get Supplier by id
 * 3. get Supplier by type
 * 4. create one
 * 5. create many
 * 6. updateOne
 * 7. delete one
 */
const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Supplier = require("../models/supplierModel");
const checklogin = require("../middlewares/checkLogin");

const supplierRouter = express.Router();

// GET ALL suppliers
supplierRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const suppliers = await Supplier.find({});
    res.send(suppliers);
    // // res.send('removed');
    // console.log(suppliers);
  })
);

// GET ONE suppliers
supplierRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const suppliers = await Supplier.find({
      _id: id,
      status: "active",
    });
    // }).populate("Product.id", "name", "ean", "article_code", "unit");
    res.send(suppliers[0]);
    // // res.send('removed');
    console.log(suppliers);
  })
);

// GET suppliers by Product article_code 
supplierRouter.get(
  "/product/:code",
  expressAsyncHandler(async (req, res) => {
    const code = req.params.code;
    const suppliers = await Supplier.find({
      // _id: id,
      status: "active",
    });
    console.log(code)
    // }).populate("Product.id", "name", "ean", "article_code", "unit");
    res.send(suppliers);
    // // res.send('removed');
    console.log(suppliers.name);
  })
);

// CREATE ONE Supplier
supplierRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newSupplier = new Supplier(req.body);
    try {
      await newSupplier.save();
      res.status(200).json({
        message: "Supplier is created Successfully",
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
