const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");

const userRouter = express.Router();

//GET ALL USERS
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

// CREATE ONE USER
userRouter.post(
    "/",
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

module.exports = userRouter;