const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Grn = require("../models/grnModel");
const { generateGrnId } = require("../middlewares/generateId");

const grnRouter = express.Router();

//GET ALL grns
grnRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const grn = await Grn.find({});
    res.send(grn);
    // // res.send('removed');
    console.log(grn);
  })
);

// GET grn by id
grnRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const grn = await Grn.find({ _id: id }).select({
      poId: 1,
      grnId: 1,
      date: 1,
      product: 1,
      titem: 1,
      gtotal: 1,
      shippingcost: 1,
      status: 1,
    })
    .populate("poId", "poId")
    .populate("grnId", "grnId")
    res.send(grn[0]);
  })
);

// CREATE ONE grn
grnRouter.post(
  "/",
  generateGrnId,
  expressAsyncHandler(async (req, res) => {
    const newGrn = new Grn(req.body);
    try {
      await newGrn.save();
      res.status(200).json({
        message: "grn is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// UPDATE ONE grn
grnRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    // console.log(req.body);
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

// DELETE ONE grn
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
