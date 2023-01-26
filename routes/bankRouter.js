const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Bank = require("../models/bank");

const bankRouter = express.Router();

//GET ALL BANKS
bankRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const bank = await Bank.find({}).select({
      _id: 1,
      name: 1,
      accountNo: 1,
      address: 1,
      branch: 1,
      swiftCode:1,
      routingNo:1,
    });
    res.send(bank);
    // // res.send('removed');
    console.log(bank);
  })
);

// GET bank by id
bankRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const bank = await Bank.find({ _id: id }).select({
      _id: 1,
      name: 1,
      accountNo: 1,
      address: 1,
      branch: 1,
      swiftCode:1,
      routingNo:1,
    });
    res.send(bank[0]);
  })
);

// GET BANK BY ACCOUNTNO
bankRouter.get(
  "/accountNo/:accountNo",
  expressAsyncHandler(async (req, res) => {
    const accountNo = req.params.accountNo;
    const bank = await Bank.find({ accountNo: accountNo });
    res.send(bank);
  })
);

// CREATE ONE BANK
bankRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newBank = new Bank(req.body);
    try {
      await newBank.save();
      res.status(200).json({
        message: "Bank is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// UPDATE ONE BANK
bankRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    // console.log(req.body);
    try {
      await Bank.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE BANK
bankRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await Bank.deleteOne({ _id: id })
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

module.exports = bankRouter;
