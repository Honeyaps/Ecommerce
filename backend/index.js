const express = require('express');
const cors = require('cors');
const userRouter = require("./Routes/user")
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);

app.listen(4900,() => 
console.log("Port connected") )
