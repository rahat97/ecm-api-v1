const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const AccountExpenditure = require("../models/accountExpenditureModel");

const accountExpenditureRouter = express.Router();

//GET ALL accountExpenditures
accountExpenditureRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const accountExpenditure = await AccountExpenditure.find({});
    res.send(accountExpenditure);
    // // res.send('removed');
    console.log(accountExpenditure);
  })
);

// GET accountExpenditure by id
accountExpenditureRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const accountExpenditure = await AccountExpenditure.find({ _id: id }).select({
        date: 1,
        accountHead: 1,
        details: 1,
        responsiblePerson: 1,
        paidTo:1,
        projectName:1,
        type:1,
        chequeNo:1,
        status:1,
    });
    res.send(accountExpenditure[0]);
  })
);

// // GET BANK BY ACCOUNTNO
// bankRouter.get(
//   "/accountNo/:accountNo",
//   expressAsyncHandler(async (req, res) => {
//     const accountNo = req.params.accountNo;
//     const bank = await Bank.find({ accountNo: accountNo });
//     res.send(bank);
//   })
// );

// CREATE ONE accountExpenditure
accountExpenditureRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    console.log(req);
    // const newAccountExpenditure = new AccountExpenditure(req.body);
    try {
      await newAccountExpenditure.save();
      res.status(200).json({
        message: "accountExpenditure is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// UPDATE ONE BANK
accountExpenditureRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    // console.log(req.body);
    try {
      await AccountExpenditure.updateOne({ _id: id }, { $set: update })
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
accountExpenditureRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await AccountExpenditure.deleteOne({ _id: id })
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

module.exports = accountExpenditureRouter;
