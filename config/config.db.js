const mongoose = require("mongoose");
require("dotenv").config();
let connection = mongoose.connect(process.env.db);

module.exports = { connection };
