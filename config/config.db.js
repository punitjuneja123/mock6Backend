const mongoose = require("mongoose");

let connection = mongoose.connect(
  "mongodb+srv://punit:punit@cluster0.hpn8i.mongodb.net/airBookingDB?retryWrites=true&w=majority"
);

module.exports = { connection };
