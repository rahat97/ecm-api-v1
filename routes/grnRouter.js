const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Grn = require("../models/grnModel");

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
      po: 1,
      productName: 1,
      date: 1,
      by: 1,
      item:1,
      total:1,
      status:1,
    });
    res.send(grn[0]);
  })
);

// CREATE ONE grn
grnRouter.post(
  "/",
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
