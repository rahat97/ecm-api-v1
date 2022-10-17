const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Client = require("../models/clients");

const clientRouter = express.Router();

clientRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const client = await Client.find();
        res.send(client);
        // // res.send('removed');
        console.log(client);
    })
);

clientRouter.get(
    "/count",
    expressAsyncHandler(async (req, res) => {
        const total = await Client.countDocuments({});
        // console.log("id");
        res.status(200).json(total);
    })
);


// GET ONE client
clientRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const clients = await Client.find({ _id: id, status: "active" });
        res.send(clients[0]);
        // // res.send('removed');
        // console.log(client);
    })
);

// CREATE ONE Client
clientRouter.post(
    "/",
    expressAsyncHandler(async (req, res) => {
        const newClient = new Client(req.body);
        try {
            await newClient.save((err, client) => {
                if (err) {
                    res
                        .status(500)
                        .json({ message: "There was a server side error", error: err });
                } else {
                    res.status(200).json({
                        message: "Client is created Successfully",
                        id: client._id,
                    });
                }
            });
        } catch (err) {
            res
                .status(500)
                .json({ message: "There was a server side error", error: err });
        }
    })
);

// CREATE MULTI Clients
clientRouter.post(
    "/all",
    expressAsyncHandler(async (req, res) => {
        await Client.insertMany(req.body, (err) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({
                    message: "Clients are created Successfully",
                });
            }
        });
    })
);

// UPDATE ONE Client
clientRouter.put(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        try {
            await Client.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE Client
clientRouter.delete(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        try {
            await Client.deleteOne({ _id: id })
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



module.exports = clientRouter;