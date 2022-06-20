const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/productModel");

// GET ALL Products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// GET One Product
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const products = await Product.find({ _id: id });
  res.send(products);
});

// create One Product
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save((err) => {
    if (err) {
      res.status(500).json({ error: "There was a server side error" });
    } else {
      res.status(200).json({
        message: "Product is created Successfully",
      });
    }
  });
});

// Create Many Product
router.post("/all", async (req, res) => {
  await Product.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({ error: "There was a server side error" });
    } else {
      res.status(200).json({
        message: "Products are created Successfully",
      });
    }
  });
});

// Update one Product
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const update = req.body;
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
});

// delete Product
router.delete("/:id", async (req, res) => {});

module.exports = router;
