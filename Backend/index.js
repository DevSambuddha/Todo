const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const app = express();
const { userRouter } = require("./routes/user");
const { todoRouter } = require("./routes/todo");
require("dotenv").config();
app.use(express.json());
const { default: mongoose } = require("mongoose");
mongoose.connect(process.env.db_todo); //How to use await

const JWT_SECRET = process.env.jwt_secret;

//Routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

app.listen(3000, () => {
  console.log("Sever Running");
});
