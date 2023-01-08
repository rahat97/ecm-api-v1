const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const productRouter = express.Router();

//GET ALL products
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const product = await Product.find({})
        .select({
          _id: 1,
          name: 1,
          unit: 1,
          category: 1,
          status: 1,
        })
        .populate("category", "name")
        .populate("unit", "name");
      //   .populated("category");

      // console.log(product);
      res.send(product);
    } catch (err) {
      console.log(err);
    }
  })
  // // res.send('removed');
);

//GET ALL product DW
productRouter.get(
    "/dw",
    expressAsyncHandler(async (req, res) => {
      const product = await Product.find({}).select({
        _id: 1,
        name: 1,
        unit:1,
      })
      .populate("unit","name")
      ;
      // console.log(product);
      res.send(product);
      // // res.send('removed');
    })
  );

// GET product by id
productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.find({ _id: id }) .populate("category", "name")
    .populate("unit", "symbol");;
    res.send(product[0]);
  })
);

// CREATE ONE Product
productRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      await newProduct.save();
      res.status(200).json({
        message: "Product is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// UPDATE ONE Product
productRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    // console.log(req.body);
    try {
      await Product.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE BANK
productRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await Product.deleteOne({ _id: id })
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

module.exports = productRouter;
