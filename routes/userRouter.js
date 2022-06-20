/**
 * USERS API
 * 1. get all Users
 * 2. get user by id
 * 3. get user by type
 * 3.1 get user by email
 * 3.2 get user by phone
 * 4. create one
 * 5. create many
 * 6. updateOne
 * 7. delete one
 */
const express = require("express");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const userRouter = express.Router();

// GET ALL USERS
userRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send({ users });
    // // res.send('removed');
    console.log(users);
  })
);

// GET ALL USERS BY TYPE
userRouter.get(
  "/type/:type",
  expressAsyncHandler(async (req, res) => {
    const type = req.params.type;
    const users = await User.find({ type: type });
    res.send(users);
  })
);

// GET USE BY ID
userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.find({ _id: id });
    res.send(user);
  })
);

// GET USER BY PHONE
userRouter.get(
  "/phone/:phone",
  expressAsyncHandler(async (req, res) => {
    const phone = req.params.phone;
    const user = await User.find({ phone: phone });
    res.send(user);
  })
);

// GET USER BY EMAIL
userRouter.get(
  "/email/:email",
  expressAsyncHandler(async (req, res) => {
    const email = req.params.email;
    const user = await User.find({ email: email });
    res.send(user);
  })
);

// CREATE ONE USER
userRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save((err) => {
      if (err) {
        res.status(500).json({ error: "There was a server side error" });
      } else {
        res.status(200).json({
          message: "User is created Successfully",
        });
      }
    });
  })
);

// CREATE MULTI USERS
userRouter.post(
  "/all",
  expressAsyncHandler(async (req, res) => {
    await User.insertMany(req.body, (err) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json({
          message: "Users are created Successfully",
        });
      }
    });
  })
);

// UPDATE ONE USER
userRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    try {
      await User.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE USER
userRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await Product.deleteOne({ _id: id })
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

module.exports = userRouter;
