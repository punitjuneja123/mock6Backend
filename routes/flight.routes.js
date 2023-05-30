const express = require("express");
const flightRouter = express.Router();

const { flightModel } = require("../models/flights.model");

flightRouter.get("/api/flights", async (req, res) => {
  try {
    let flightData = await flightModel.find();
    res.send(flightData);
  } catch (error) {
    res.send("something went wrong");
  }
});

flightRouter.get("/api/flights/:id", async (req, res) => {
  let flightID = req.params.id;
  try {
    let flightData = await flightModel.find({ _id: flightID });
    res.send(flightData);
  } catch (error) {
    res.send("something went wrong");
  }
});

flightRouter.post("/api/flights", async (req, res) => {
  try {
    let payload = req.body;
    let flightDetails = await new flightModel(payload);
    flightDetails.save();
    res.status(201);
    res.send("flight details added successfully");
  } catch (error) {
    res.send("something went wrong");
  }
});

flightRouter.patch("/api/flights/:id", async (req, res) => {
  let flightID = req.params.id;
  let payload = req.body;
  try {
    await flightModel.findByIdAndUpdate({ _id: flightID }, payload);
    // res.status(204);
    res.send("flight data updated");
  } catch (error) {
    console.log(error);
    res.send("something went wrong");
  }
});

flightRouter.delete("/api/flights/:id", async (req, res) => {
  let flightID = req.params.id;
  console.log(flightID);
  try {
    await flightModel.findByIdAndDelete({ _id: flightID });
    res.status(202);
    res.send("flight data deleted");
  } catch (error) {
    console.log(error);
    res.send("something went wrong");
  }
});

module.exports = { flightRouter };

// {
//   "airline": "IndiGO",
//   "flightNo": "998989",
//   "departure": "Mumbai",
//   "arrival": "Chennai",
//   "departureTime": "12:30PM",
//   "arrivalTime": "2:00PM",
//   "seats": 5,
//   "price": 7000
// }
