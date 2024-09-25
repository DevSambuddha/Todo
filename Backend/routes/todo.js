const { Router } = require("express");
const todoRouter = Router();
const auth = require("../auth");

todoRouter.post("/todo", auth, function (res, req) {
  const userId = req.userId;
  res.json({
    userId: userId,
  });
});

todoRouter.get("/todos", auth, function (res, req) {
  const userId = req.userId;
  res.json({
    userId: userId,
  });
});

module.exports = {
  todoRouter: todoRouter,
};
