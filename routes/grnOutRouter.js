const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const GrnOut = require("../models/grnModel");
const { generateGrnId } = require("../middlewares/generateId");
const { stockOut } = require("../middlewares/useInventory");

const grnOutRouter = express.Router();

//GET ALL grnOuts
grnOutRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const grnOut = await GrnOut.find({});
    res.send(grnOut);
    // // res.send('removed');
    console.log(grnOut);
  })
);
grnOutRouter.get(
  "/in",
  expressAsyncHandler(async (req, res) => {
    const grnOut = await GrnOut.find({type:"in"});
    res.send(grnOut);
    // // res.send('removed');
    console.log(grnOut);
  })
);
grnOutRouter.get(
  "/out",
  expressAsyncHandler(async (req, res) => {
    const grnOut = await GrnOut.find({type:"out"});
    res.send(grnOut);
    // // res.send('removed');
    console.log(grnOut);
  })
);

// GET grnOut by id
grnOutRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const grnOut = await GrnOut.find({ _id: id }).select({
      poId: 1,
      invoiceNo: 1,
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
    res.send(grnOut[0]);
  })
);

// CREATE ONE grnOut
grnOutRouter.post(
  "/",
  generateGrnId,
  stockOut,
  expressAsyncHandler(async (req, res) => {
    const newGrn = new GrnOut(req.body);
    try {
      await newGrn.save();
      res.status(200).json({
        message: "grnOut is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// UPDATE ONE grnOut
grnOutRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    // console.log(req.body);
    try {
      await GrnOut.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE grnOut
grnOutRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await GrnOut.deleteOne({ _id: id })
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

module.exports = grnOutRouter;
