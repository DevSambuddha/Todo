const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const { default: mongoose } = require("mongoose");
//How to use await
mongoose.connect(process.env.db_todo);

const JWT_SECRET = process.env.jwt_secret;
app.use(express.json());

app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.create({
    email: email,
    password: password,
    name: name,
  });

  res.json({
    message: "You are logged in",
  });
});

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  // finding email and password
  const user = await UserModel.findOne({
    email: email,
    password: password,
  });
  console.log(user);
  if (user) {
    //authintication token
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

app.post("/todo", auth, function (res, req) {
  const userId = req.userId;
  res.json({
    userId: userId,
  });
});

app.get("/todos", auth, function (res, req) {
  const userId = req.userId;
  res.json({
    userId: userId,
  });
});

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

app.listen(3000,() => {
console.log("Sever Running")});
