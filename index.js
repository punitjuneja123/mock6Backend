const port = 4500;

const express = require("express");

const app = express();
app.use(express.json());

const { connection } = require("./config/config.db");

const { userRouter } = require("./routes/user.routes");
const { flightRouter } = require("./routes/flight.routes");
const { bookingRouter } = require("./routes/booking.routes");
const { authentication } = require("./middlewares/authentication.middleware");

app.get("/", (req, res) => {
  res.send("welcome to air ticket booking");
});
app.use(userRouter);
app.use(authentication);
app.use(flightRouter);
app.use(bookingRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log("server running at port", port);
});
