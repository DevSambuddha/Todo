const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.jwt_secret;

function auth(res, req, next) {
  const token = req.headers.token;

  const decodedData = jwt.verify(token, JWT_SECRET);

  if (decodedData) {
    req.userId = decodedData.userId;
    next();
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
}

module.exports = auth;
