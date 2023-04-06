const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Damage = require("../models/damageModel");
const {generateDamageId} = require("../middlewares/generateId");
const { damageOut } = require("../middlewares/useInventory");

const damageRouter = express.Router();

//GET ALL Damage
damageRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const damage = await Damage.find({})
      
      // .populate("product", "name")
      // .populate("prid", "name");
      console.log(damage);
    res.send(damage);
    // // res.send('removed');
  })
);

// GET damage BY ID
damageRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const damage = await Damage.find({ _id: id }).select({
        dmgId: 1,
        date: 1,
        by: 1,
        product: 1,
        reason: 1,
        status: 1,
    });
    res.send(damage[0]);
  })
);

// CREATE ONE Damage
damageRouter.post(
  "/",
  generateDamageId,
  damageOut,
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const newDamage = new Damage(req.body);
    try {
      await newDamage.save();
      res.status(200).json({
        message: "Damage is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

//UPDATE Damage
damageRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    // console.log(req.body);
    try {
      await Damage.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE Damage
damageRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await Damage.deleteOne({ _id: id })
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

module.exports = damageRouter;
