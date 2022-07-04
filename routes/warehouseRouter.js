/**
 * warehouses API
 * 1. get all warehouses
 * 2. get Warehouse by id
 * 3. get Warehouse by type
 * 4. create one
 * 5. create many
 * 6. updateOne
 * 7. delete one
 */
const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Warehouse = require("../models/warehouseModel");
const checklogin = require("../middlewares/checkLogin");

const warehouseRouter = express.Router();

// GET ALL warehouses
warehouseRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const warehouses = await Warehouse.find({ status: "active" });
    res.send(warehouses);
    // // res.send('removed');
    console.log(warehouses);
  })
);

// GET ONE warehouses
warehouseRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const warehouses = await Warehouse.find({ _id: id, status: "active" });
    res.send(warehouses[0]);
    // // res.send('removed');
    console.log(warehouses);
  })
);

// CREATE ONE Warehouse
warehouseRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newWarehouse = new Warehouse(req.body);
    try {
      await newWarehouse.save();
      res.status(200).json({
        message: "Warehouse is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
  })
);

// CREATE MULTI warehouses
warehouseRouter.post(
  "/all",
  expressAsyncHandler(async (req, res) => {
    await Warehouse.insertMany(req.body, (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "warehouses are created Successfully",
        });
      }
    });
  })
);

// UPDATE ONE Warehouse
warehouseRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
      await Warehouse.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE Warehouse
warehouseRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await Warehouse.deleteOne({ _id: id })
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

module.exports = warehouseRouter;
