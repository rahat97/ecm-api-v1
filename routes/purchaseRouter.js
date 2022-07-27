/**
 * Purchases API
 * 1. get all Purchases
 * 2. get Purchase by id
 * 3. get Purchase by type
 * 4. create one
 * 5. create many
 * 6. updateOne
 * 7. delete one
 */
const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Purchase = require("../models/purchaseModel");
const checklogin = require("../middlewares/checkLogin");
const { generatePoId } = require("../middlewares/generateId");

const purchaseRouter = express.Router();

// GET ALL Purchases
purchaseRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const Purchases = await Purchase.find({})
      .select({
        poNo: 1,
        supplier: 1,
        warehouse: 1,
        type: 1,
        totalItem: 1,
        total: 1,
        status: 1,
        createdAt: 1,
      })
      .populate("supplier", "name")
      .populate("warehouse", "name")
      .populate("userId", "name");
    //   .exec(callback);

    res.send(Purchases);
    // // res.send('removed');
    // console.log(Purchases);
  })
);

// GET ONE Purchases
purchaseRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const Purchases = await Purchase.find({ _id: id })
      .populate("supplier", { company: 1, email: 1, phone: 1, address: 1 })
      .populate("warehouse", "name")
      .populate("userId", "name");
    // .populate("userId")
    res.send(Purchases[0]);
    // // res.send('removed');
    console.log(Purchases);
  })
);

// CREATE ONE Purchase
purchaseRouter.post(
  "/",
  generatePoId,
  expressAsyncHandler(async (req, res) => {
    const newPurchase = new Purchase(req.body);
    try {
      await newPurchase.save();
      res.status(200).json({
        message: "Purchase is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// CREATE MULTI Purchases
purchaseRouter.post(
  "/all",
  expressAsyncHandler(async (req, res) => {
    await Purchase.insertMany(req.body, (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "Purchases are created Successfully",
        });
      }
    });
  })
);

// UPDATE ONE Purchase
purchaseRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
      await Purchase.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE Purchase
purchaseRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await Purchase.deleteOne({ _id: id })
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

module.exports = purchaseRouter;
