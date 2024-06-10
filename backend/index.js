const express = require('express');
const cors = require('cors');
const userRouter = require("./Routes/user")
const adminRouter = require("./Routes/admin");
const addProductRouter = require('./Routes/product');
const app = express();

app.use(cors());
app.use(express.json());

// for user registration
app.use("/user", userRouter);

// for admin signin
app.use("/admin", adminRouter);

// for adding product
app.use("/product", addProductRouter)

app.listen(4900,() => 
console.log("Port connected") )
