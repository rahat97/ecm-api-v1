/**
 * CATEGORY API
 * 1. get all Category
 * 2. get category by group
 * 3. get category by id
 * 3.1 get category by parent
 * 3.2 get master category
 * 4. create one
 * 5. create many
 * 6. updateOne
 * 7. delete one
 */
const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const upload = require("../middlewares/fileUploader");

const categoryRouter = express.Router();

// GET ALL CATEGORY
categoryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.send(categories);
    // // res.send('removed');
    // console.log(categories);
  })
);

// GET ALL CATEGORY BY GROUP
categoryRouter.get(
  "/group/:group",
  expressAsyncHandler(async (req, res) => {
    const group = req.params.group;
    const categories = await Category.find({ group: group });
    res.send(categories);
  })
);

// GET CATEGORY BY ID
categoryRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const category = await Category.find({ _id: id });
    res.send(category);
  })
);

// GET CATEGORY BY PARENT
categoryRouter.get(
  "/parent/:parent",
  expressAsyncHandler(async (req, res) => {
    const parent = req.params.parent;
    const category = await Category.find({ mc: parent });
    res.send(category);
  })
);

// CREATE ONE CATEGORY
categoryRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newCategory = new Category(req.body);
    await newCategory.save((err) => {
      if (err) {
        res.status(500).json({ error: "There was a server side error" });
      } else {
        res.status(200).json({
          message: "Category is created Successfully",
        });
      }
    });
  })
);

// CREATE MULTI CATEGORIES
categoryRouter.post(
  "/all",
  expressAsyncHandler(async (req, res) => {
    await Category.insertMany(req.body, (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "Category are created Successfully",
        });
      }
    });
  })
);

// UPDATE ONE CATEGORY
categoryRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
      await Category.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE CATEGORY
categoryRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await Category.deleteOne({ _id: id })
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

// CATEGORY PHOTO UPLOAD
categoryRouter.post("/photo", upload.single("c_photo"), (req, res) => {
  res.send(req.file);
});
// CATEGORY PHOTO UPLOAD
categoryRouter.post("/doc", upload.single("doc"), (req, res) => {
  res.send(req.file);
});

module.exports = categoryRouter;
