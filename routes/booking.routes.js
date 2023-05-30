const express = require("express");
const bookingRouter = express.Router();

const { bookingModel } = require("../models/bookings.model");
const { flightModel } = require("../models/flights.model");
const { userModel } = require("../models/users.model");

bookingRouter.post("/api/booking", async (req, res) => {
  try {
    let payload = req.body;
    let bookingUser = await new bookingModel({
      user: payload.userID,
      flight: payload.flightID,
    });
    bookingUser.save();
    res.status(201);
    res.send("flight booked");
  } catch (error) {
    console.log(error);
    res.send("something went wrong");
  }
});

bookingRouter.get("/api/dashboard", async (req, res) => {
  try {
    let allBookingData = [];
    let bookingData = await bookingModel.find();
    for (let i = 0; i < bookingData.length; i++) {
      let userData = await userModel.find({ _id: bookingData[i].user });
      let flightData = await flightModel.find({ _id: bookingData[i].flight });
      let data = {
        name: userData[0].name,
        email: userData[0].email,
        flightDetail: flightData,
      };
      allBookingData.push(data);
    }
    res.send(allBookingData);
  } catch (error) {
    console.log(error);
    res.send("something went wrong");
  }
});

module.exports = { bookingRouter };
