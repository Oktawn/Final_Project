const Router = require("express");
const userController = require("../controller/userController");
const userRouter = new Router();

userRouter.post("/user", userController.createUser);
userRouter.get("/user/:id", userController.getUser);
userRouter.put("/user", userController.updatePassword);
userRouter.delete("/user/:id", userController.deleteUser);
module.exports = userRouter;
