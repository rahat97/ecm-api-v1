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
const bcrypt = require("bcrypt");
const router = express.Router();
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const checklogin = require("../middlewares/checkLogin");

const userRouter = express.Router();

// GET ALL USERS
userRouter.get(
  "/",
  checklogin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({ status: "active" });
    res.send(users);
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
  checklogin,
  expressAsyncHandler(async (req, res) => {
    const newUser = new User(req.body);
    try {
      await newUser.save();
      res.status(200).json({
        message: "User is created Successfully",
      });
    } catch (err) {
      res
        .status(500)
        .json({ message: "There was a server side error", error: err });
    }
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
      await User.deleteOne({ _id: id })
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

// USER SIGNIN
userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    try {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      let userNameGen = req.body.name;
      let un = userNameGen.replace(" ", "").substring(0, 10).toLowerCase();
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: un,
        phone: req.body.phone,
        type: req.body.type,
        address: req.body.address,
        previllage: req.body.previllage,
        password: hashPassword,
        status: req.body.status,
      });
      await newUser.save();
      res.status(200).json({
        message: "Registration Successful",
        status: "success",
        data: un,
      });
    } catch (error) {
      res.status(400).json({
        message: "Registration Unsuccessful",
        error: error,
        ststus: "fail",
      });
    }

    // res.send(newUser);?
  })
);

// USER LOGIN
userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    try {
      const user = await User.find({
        status: "active",
        username: req.body.email,
      });

      if (user && user.length > 0) {
        const isValidPassword = await bcrypt.compare(
          req.body.password,
          user[0].password
        );
        if (isValidPassword) {
          // generate token
          const token = jwt.sign(
            {
              username: user[0].username,
              userId: user[0]._id,
              type: user[0].type,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.status(200).json({
            access_token: token,
            status: "success",
            message: "Login Successful",
          });
        } else {
          res.status(401).json({
            status: "fail",
            error: "Password Doesnot Match",
          });
        }
      } else {
        res.status(401).json({
          status: "fail",
          error: "User Not Found",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: "fail",
        error: err,
      });
    }
  })
);

module.exports = userRouter;
