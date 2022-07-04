/**
 * tpns API
 * 1. get all tpns
 * 2. get Tpn by id
 * 3. get Tpn by type
 * 4. create one
 * 5. create many
 * 6. updateOne
 * 7. delete one
 */
const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Tpn = require("../models/tpnModel");
const checklogin = require("../middlewares/checkLogin");

const tpnRouter = express.Router();

// GET ALL tpns
tpnRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const tpns = await Tpn.find();
    res.send(tpns);
    // // res.send('removed');
    console.log(tpns);
  })
);

// GET ONE tpns
tpnRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const tpns = await Tpn.find({ _id: id });
    res.send(tpns[0]);
    // // res.send('removed');
    console.log(tpns);
  })
);

// CREATE ONE Tpn
tpnRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newTpn = new Tpn(req.body);
    try {
      await newTpn.save();
      res.status(200).json({
        message: "Tpn is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// CREATE MULTI tpns
tpnRouter.post(
  "/all",
  expressAsyncHandler(async (req, res) => {
    await Tpn.insertMany(req.body, (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "tpns are created Successfully",
        });
      }
    });
  })
);

// UPDATE ONE Tpn
tpnRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
      await Tpn.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE Tpn
tpnRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await Tpn.deleteOne({ _id: id })
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

module.exports = tpnRouter;
