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

// COUNT PRODUCT
router.get(
  "/count",
  expressAsyncHandler(async (req, res) => {
    const total = await Product.countDocuments({});
    res.status(200).json(total);
  })
);

// GET ALL PRODUCTS WITH PAGENATION
router.get(
  "/all/:page/:size",
  expressAsyncHandler(async (req, res) => {
    const page = parseInt(req.params.page);
    const size = parseInt(req.params.size);
    // const page = parseInt(req.query.page);
    // const size = parseInt(req.query.size);
    console.log("page:", page, "size:", size);
    const query = {};

    if (page || size) {
      product = await Product.find({})
        .skip(page * size)
        .limit(size)
        .select({
          name: 1,
          ean: 1,
          article_code: 1,
          priceList: 1,
          category: 1,
        });
    } else {
      product = await Product.find({}).select({
        name: 1,
        ean: 1,
        article_code: 1,
        priceList: 1,
        category: 1,
      });
    }
    res.send(product);
  })
);

// GET ALL PRODUCTS UPDATED
router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
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
  })
);

// GET ALL ACTIVE PRODUCTS UPDATED
router.get(
  "/active",
  expressAsyncHandler(async (req, res) => {
    try {
      const products = await Product.findActive();
      res.send(products);
    } catch {
      res.status(500).json("Server side error");
    }
  })
);

// GET ALL PRODUCTS
router.get(
  "/category/:category",
  expressAsyncHandler(async (req, res) => {
    const category = req.params.category;
    const products = await Product.find({
      category: { $regex: new RegExp("^" + category.toLowerCase(), "i") },
    });
    res.send(products);
  })
);

// GET ALL FEATURED PRODUCTS
router.get(
  "/featured",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({
      featured: true,
    });
    res.send(products);
  })
);

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

// ECOMMERCE SEARCH
router.get(
  "/web-search/:q",
  expressAsyncHandler(async (req, res) => {
    let payload = req.params.q.trim().toString().toLocaleLowerCase();

    query = { name: { $regex: new RegExp("^" + payload + ".*", "i") } };
    const search = await Product.find(query)
      .select({
        _id: 1,
        name: 1,
        ean: 1,
        unit: 1,
        article_code: 1,
        priceList: 1,
        category: 1,
      })
      .limit(10);
    if (payload === "") {
      res.send([]);
    } else {
      res.send({ search });
    }
  })
);

// PRODUCTS SRARCH
router.get(
  "/search/:q",
  expressAsyncHandler(async (req, res) => {
    let payload = req.params.q.trim().toString().toLocaleLowerCase();

    // res.send(payload)
    // check search item num | ean or article code
    const isNumber = /^\d/.test(payload);
    let query = {};
    if (!isNumber) {
      query = { name: { $regex: new RegExp("^" + payload + ".*", "i") } };
      // query = { name:  payload  };
    } else {
      query = {
        $or: [
          // { ean: payload   },
          // { article_code:  payload }
          { ean: { $regex: new RegExp("^" + payload + ".*", "i") } },
          { article_code: { $regex: new RegExp("^" + payload + ".*", "i") } },
        ],
      };
    }

    const search = await Product.find(query)
      .select({
        _id: 1,
        name: 1,
        ean: 1,
        unit: 1,
        article_code: 1,
        priceList: 1,
        category: 1,
      })
      .limit(10);
    if (payload === "") {
      res.send([]);
    } else {
      res.send({ search });
    }
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
