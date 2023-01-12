const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const test = require("../models/testModel");
const checklogin = require("../middlewares/checkLogin");

const testRouter = express.Router();

// GET ALL test
testRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const tests = await test.find();
    res.send(tests);
    // // res.send('removed');
    // console.log(tests);
  })
);

// GET ALL tests
testRouter.get(
  "/dw",
  expressAsyncHandler(async (req, res) => {
    const tests = await test.find({}).select({ _id: 1, symbol: 1, name: 1 });
    res.send(tests);
  })
);

// GET ONE tests
testRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const tests = await test.find({ _id: id });
    res.send(tests[0]);
    // // res.send('removed');
    // console.log(tests);
  })
);

// CREATE ONE Unit
testRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newTest = new test(req.body);
    try {
      await newTest.save();
      res.status(200).json({
        message: "Test is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// CREATE MULTI tests
testRouter.post(
  "/all",
  expressAsyncHandler(async (req, res) => {
    await test.insertMany(req.body, (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "tests are created Successfully",
        });
      }
    });
  })
);

// UPDATE ONE test
testRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    const update = req.body;
    try {
      await test
        .updateOne({ _id: id }, { $set: update })
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

// DELETE ONE test
testRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await test
        .deleteOne({ _id: id })
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

module.exports = testRouter;
