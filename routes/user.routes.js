const express = require("express");
const userRouter = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { userModel } = require("../models/users.model");

userRouter.post("/api/register", async (req, res) => {
  let payload = req.body;
  //   console.log(req.body);
  let checkEmail = await userModel.find({ email: payload.email });
  if (checkEmail.length == 0) {
    bcrypt.hash(payload.password, +process.env.salt, async (err, hash) => {
      if (err) {
        req.send("something went wrong");
      } else {
        payload.password = hash;
        let registerUser = new userModel(payload);
        await registerUser.save();
        res.status(201);
        res.send("user registered");
      }
    });
  } else {
    res.send("user already exists");
  }
});

userRouter.post("/api/login", async (req, res) => {
  let payload = req.body;
  let userData = await userModel.find({ email: payload.email });
  if (userData.length > 0) {
    bcrypt.compare(payload.password, userData[0].password, (err, result) => {
      if (result) {
        let token = jwt.sign({ userID: userData[0]._id }, process.env.secret);
        res.status(201);
        res.send({ mag: "login successful", token: token });
      } else {
        res.status(403);
        res.send("wrong credential");
      }
    });
  } else {
    res.status(403);
    res.send("wrong credential");
  }
});

module.exports = { userRouter };
