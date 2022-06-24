/**
 * pos API
 * 1. get all pos
 * 2. get PO by id
 * 3. get PO by type
 * 3.1 get PO by email
 * 3.2 get PO by phone
 * 4. create one
 * 5. create many
 * 6. updateOne
 * 7. delete one
 */
const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const PO = require("../models/poModel");
const checklogin = require("../middlewares/checkLogin");
const generateId = require("../utility/generateId");

const poRouter = express.Router();

// GET ALL pos
poRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const pos = await PO.find();
    res.send(pos);
    // // res.send('removed');
  })
);

// GET ONE pos
poRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const pos = await PO.find({ _id: id, status: "complete" });
    res.send(pos);
    // // res.send('removed');
    console.log(pos);
  })
);

// CREATE ONE PO
poRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newPO = new PO(req.data);
    // try {
    //   await newPO.save();
    //   res.status(200).json({
    //     message: "PO is created Successfully",
    //   });
    // } catch (err) {
    //   res
    //     .status(500)
    //     .json({ message: "There was a server side error", error: err });
    // }
    // console.log(newPO);
    req.send(newPO);
  })
);

// CREATE MULTI pos
poRouter.post(
  "/all",
  expressAsyncHandler(async (req, res) => {
    await PO.insertMany(req.body, (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "pos are created Successfully",
        });
      }
    });
  })
);

// UPDATE ONE PO
poRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
      await PO.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE PO
poRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await PO.deleteOne({ _id: id })
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

module.exports = poRouter;
