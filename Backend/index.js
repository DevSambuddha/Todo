const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const app = express();
const { userRouter } = require("./routes/user");
const { todoRouter } = require("./routes/todo");
require("dotenv").config();
app.use(express.json()); //HTTP Deep Dive
const { default: mongoose } = require("mongoose");

(async () => {
  try {
    await mongoose.connect(process.env.db_todo);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Error occured");
  }
})();

const JWT_SECRET = process.env.jwt_secret;

//Routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Sever Running on port ${port}`);
});
