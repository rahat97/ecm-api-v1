/**
 * PRODUCTS API
 * 1. get all product "/"
 * 1.1. get product by category
 * 2. get product by id "/:id"
 * 3. get product by article code "/code/:code"
 * 4. get product by ean "/ean/:ean"
 * 5. create one "/"
 * 6. create many "/all"
 * 7. updateOne "/:id"
 * 8. delete one "/:id"
 * Only I know what I have done for this
 */
const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// GET ALL PRODUCTS UPDATED
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({})
      .select({
        name: 1,
        ean: 1,
        article_code: 1,
        priceList: 1,
        category: 1,
      })
      .populate("category", "name");
    res.send(products);
  } catch {
    res.status(500).json("Server side error");
  }
});

// GET ALL ACTIVE PRODUCTS UPDATED
router.get("/active", async (req, res) => {
  try {
    const products = await Product.findActive();
    res.send(products);
  } catch {
    res.status(500).json("Server side error");
  }
});

// GET ALL PRODUCTS
router.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  const products = await Product.find({
    category: { $regex: new RegExp("^" + category.toLowerCase(), "i") },
  });
  res.send(products);
});

// GET ALL FEATURED PRODUCTS
router.get("/featured", async (req, res) => {
  const products = await Product.find({
    featured: true,
  });
  res.send(products);
});

// GET ONE PRODUCT
router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const products = await Product.find({ _id: id }).populate(
      "category",
      "name"
    );
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
// GET PRODUCT BY category
router.get(
  "/category/:id",
  expressAsyncHandler(async (req, res) => {
    const category = req.params.category;
    const products = await Product.find({ category: category });
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
    console.log(req.body);
    await Product.deleteMany({});
    await Product.insertMany(req.body, (err) => {
      if (err) {
        res
          .status(500)
          .json({ error: "There was a server side error", err: err });
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
// // DELETE ALL
// router.get(
//   "/del-all",
//   expressAsyncHandler(async (req, res) => {
//     try {
//       await Product.remove((response) => {
//         res.send(response);
//       }).catch((err) => {
//         res.send(err);
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   })
// );

module.exports = router;
