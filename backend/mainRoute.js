const express = require("express"); 
const userRouter = require("./Routes/user");
const adminRouter = require("./Routes/admin");
const addProductRouter = require("./Routes/product");

const mainRouter = express.Router();

mainRouter.use("/user", userRouter);
mainRouter.use("/admin", adminRouter);
mainRouter.use("/product", addProductRouter)

module.exports = mainRouter;
