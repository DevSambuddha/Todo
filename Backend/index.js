const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const app = express();
const { userRouter } = require("./routes/user");
const { todoRouter } = require("./routes/todo");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
//How to use await
mongoose.connect(process.env.db_todo);

const JWT_SECRET = process.env.jwt_secret;
app.use(express.json());

//Routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

app.listen(3000, () => {
  console.log("Sever Running");
});
