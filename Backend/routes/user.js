const { Router } = require("express");
const userRouter = Router();

userRouter.post("/signup", async () => {
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

userRouter.post("/signin", async () => {
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

module.exports = {
  userRouter: userRouter,
};
