/**
 * USERS API
 * 1. get all Users
 * 2. get user by id
 * 3. get user by group
 * 4. create one
 * 5. create many
 * 6. updateOne
 * 7. delete one
 */
const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const User = require("../models/userModels.js");

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
    // res.send('removed');
  })
);

export default userRouter;
