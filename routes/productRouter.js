/**
 * PRODUCTS API
 * 1. get all product
 * 2. get product by id
 * 3. get product by article code
 * 4. get product by ean
 * 5. create one
 * 6. create many
 * 7. updateOne
 * 8. delete one
 */
const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// GET ONE PRODUCT
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const products = await Product.find({ _id: id });
    res.send(products);
  })
);

// GET ONE PRODUCT BY ARTICLE CODE
router.get(
  "/code/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const products = await Product.find({ article_code: id });
    res.send(products);
  })
);

// GET ONE PRODUCT BY EAN
router.get(
  "/ean/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const products = await Product.find({ ean: id });
    res.send(products);
  })
);

// CREATE ONE PRODUCT
router.post(
  "/",
  expressAsyncHandler(async (req, res) => {
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
  })
);

// CREATE MANY PRODUCTS
router.post(
  "/all",
  expressAsyncHandler(async (req, res) => {
    await Product.insertMany(req.body, (err) => {
      if (err) {
        res.status(500).json({ error: "There was a server side error" });
      } else {
        res.status(200).json({
          message: "Products are created Successfully",
        });
      }
    });
  })
);

// UPDATE ONE PRODUCT
router.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
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
  })
);

// DELETE PRODUCT
router.delete(
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

module.exports = router;
