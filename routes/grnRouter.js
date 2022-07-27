/**
 * grns API
 * 1. get all grns
 * 2. get Grn by id
 * 3. get Grn by type
 * 4. create one
 * 5. create many
 * 6. updateOne
 * 7. delete one
 */
const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Grn = require("../models/grnModel"); // Goods Recieve Note
const checklogin = require("../middlewares/checkLogin");
const { generateGrnId } = require("../middlewares/generateId");

const grnRouter = express.Router();

// GET ALL grns
grnRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const grns = await Grn.find({})
      .select({
        poNo: 1,
        GrnNo: 1,
        userId: 1,
        totalItem: 1,
        supplier: 1,
        total: 1,
        status: 1,
        createdAt: 1,
      })
      .populate("poNo", "poNo")
      .populate("supplier", "name")
      .populate("userId", "name");
    res.send(grns);
    // // res.send('removed');
    console.log(grns);
  })
);

// GET ONE grns
grnRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const grns = await Grn.find({ _id: id })
      .select({
        poNo: 1,
        GrnNo: 1,
        userId: 1,
        supplier: 1,
        warehouse: 1,
        products: 1,
        type: 1,
        totalItem: 1,
        total: 1,
        status: 1,
        createdAt: 1,
      })
      .populate("poNo", "poNo")
      .populate("supplier", { company: 1, email: 1, phone: 1, address: 1 })
      .populate("warehouse", "name")
      .populate("userId", "name");
    res.send(grns[0]);
    // // res.send('removed');
    console.log(grns);
  })
);

// CREATE ONE Grn
grnRouter.post(
  "/",
  generateGrnId,
  expressAsyncHandler(async (req, res) => {
    const newGrn = new Grn(req.body);
    try {
      await newGrn.save();
      res.status(200).json({
        message: "Grn is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// CREATE MULTI grns
grnRouter.post(
  "/all",
  expressAsyncHandler(async (req, res) => {
    await Grn.insertMany(req.body, (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "grns are created Successfully",
        });
      }
    });
  })
);

// UPDATE ONE Grn
grnRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
      await Grn.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE Grn
grnRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await Grn.deleteOne({ _id: id })
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

module.exports = grnRouter;
