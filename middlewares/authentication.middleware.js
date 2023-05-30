const jwt = require("jsonwebtoken");
require("dotenv").config();

function authentication(req, res, next) {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.secret, (err, decode) => {
      if (err) {
        res.send("provide a correct token");
      } else {
        req.body.userID = decode.userID;
        next();
      }
    });
  } else {
    res.send("please provide a token");
  }
}

module.exports = { authentication };
