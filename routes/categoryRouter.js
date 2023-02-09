const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

const categoryRouter = express.Router();

//GET ALL category
categoryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const category = await Category.find({})
        .select({
          _id: 1,
          name: 1,
          parent: 1,
          status: 1,
          details: 1,
        })
        .populate("parent", "name");
      // console.log(category);
      res.send(category);
    } catch (err) {
      console.error(err);
    }
    // // res.send('removed');
  })
);
//GET ALL category DW
categoryRouter.get(
  "/dw",
  expressAsyncHandler(async (req, res) => {
    const category = await Category.find({
      $or: [{ parent: null }, { parent: { $exists: false } }],
    }).select({
      _id: 1,
      name: 1,
    });
    console.log(category);
    res.send(category);
  })
);

// GET category by id
categoryRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const category = await Category.find({ _id: id });
    res.send(category[0]);
  })
);

// CREATE ONE Category
categoryRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newCategory = new Category(req.body);
    try {
      await newCategory.save();
      res.status(200).json({
        message: "Category is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// UPDATE ONE Category
categoryRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    // console.log(req.body);
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

// DELETE ONE Category
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

module.exports = categoryRouter;
