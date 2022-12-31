const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");

const userRouter = express.Router();

//GET ALL USERS
userRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.find({}).select({
        _id: 1,
        name: 1,
        email: 1,
        status: 1,
        phone: 1,
        type: 1,
      });
      res.send(user);
      //   res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ status: false, message: err });
    }
    console.log(user);
  })
);
//GET ALL USERS
userRouter.get(
  "/eng_dw",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.find({status : "active", type: "site_engineer"}).select({
        _id: 1,
        name: 1,
        // email: 1,
        // status: 1,
        // phone: 1,
        // type: 1,
      })
      ;
      res.send(user);
      //   res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ status: false, message: err });
    }
    console.log(user);
  })
);

// GET USER BY ID
userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.find({ _id: id }).select({
      name: 1,
      email: 1,
      phone: 1,
      type: 1,
      status: 1,
      username: 1,
    });
    res.send(user[0]);
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

// GET ALL USERS BY TYPE
userRouter.get(
  "/type/:type",
  expressAsyncHandler(async (req, res) => {
    const type = req.params.type;
    const users = await User.find({ type: type });
    res.send(users);
  })
);

// CREATE ONE USER
userRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newUser = new User(req.body);
    // console.log(newUser)
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

//UPDATE ONE USER
userRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    // console.log(req.body);
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

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    console.log(bcrypt);
    
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    console.log("new user", req.body);
    console.log("hash", hashPassword);
    try {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        phone: req.body.phone,
        type: req.body.type,
        address: "",
        privilege: {},
        password: req.body.password,
        status: req.body.status,
      });
      await newUser.save();
      res.status(200).json({
        message: "Registration Successful",
        status: "success",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "There was a server side error", error });
    }
  })
);

// USER LOGIN
userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      req.body.email
    );
    // console.log({ body: req.body, email: isEmail })
    try {
      let user;
      if (isEmail) {
        user = await User.find({
          status: "active",
          email: req.body.email.toLowerCase(),
        });
      } else {
        user = await User.find({
          status: "active",
          username: req.body.email.toLowerCase(),
        });
      }
      // console.log(user)
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
            status: true,
            user: {
              id: user[0]._id,
              name: user[0].name,
              username: user[0].username,
              email: user[0].email,
              type: user[0].type,
            },
            message: "Login Successful",
          });
        } else {
          res.status(401).json({
            status: false,
            error: "Password Does not Match",
          });
        }
      } else {
        res.status(401).json({
          status: false,
          error: "User Not Found",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: false,
        error: err,
      });
    }
  })
);
// USER Validation
userRouter.post(
  "/valid",
  expressAsyncHandler(async (req, res) => {
    try {
      let user;
      // console.log(req.body);

      user = await User.find({
        status: "active",
        username: req.body.username.toLowerCase(),
      });
      // console.log("user:", user);

      if (user && user.length > 0) {
        const isValidPassword = await bcrypt.compare(
          req.body.password,
          user[0].password
        );
        if (isValidPassword) {
          res.status(200).json({ status: true });
        } else {
          res.status(401).json({
            status: false,
            error: "Password Does not Match",
          });
        }
      } else {
        res.status(401).json({
          status: false,
          error: "User Not Found",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: false,
        error: err,
      });
    }
  })
);

module.exports = userRouter;
