const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const SubContractor = require("../models/subContractorModel");

const subContractorRouter = express.Router();

//GET ALL SubContractor
subContractorRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const subContractor = await SubContractor.find({});
        res.send(subContractor);
        // // res.send('removed');
        console.log(subContractor);
    })
);

// GET subContractor by id
subContractorRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const subContractor = await SubContractor.find({ _id: id }).select({
            name: 1,
            phone: 1,
            email: 1,
            address: 1,
            nid: 1,
            status: 1,
            
        });
        res.send(subContractor[0]);
    })
);

// CREATE ONE subContractor
subContractorRouter.post(
    "/",
    expressAsyncHandler(async (req, res) => {
        const newSubContractor = new SubContractor(req.body);
        try {
            await newSubContractor.save();
            res.status(200).json({
                message: "SubContractor is created Successfully",
            });
        } catch (err) {
            res
                .status(500)
                .json({ message: "There was a server side error", error: err });
        }
    })
);

// UPDATE ONE SubContractor
subContractorRouter.put(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        const update = req.body;
        // console.log(req.body);
        try {
            await SubContractor.updateOne({ _id: id }, { $set: update })
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

// DELETE ONE SubContractor
subContractorRouter.delete(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const id = req.params.id;
        try {
            await SubContractor.deleteOne({ _id: id })
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

module.exports = subContractorRouter;