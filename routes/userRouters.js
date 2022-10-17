const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");

const userRouter = express.Router();

userRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const user = await User.find({});
        res.send(user);
        // // res.send('removed');
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



module.exports = userRouter;