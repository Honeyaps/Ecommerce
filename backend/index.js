const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express().json());

app.use("/user",userRouter);

app.listen(4600,() => 
console.log("Port connected") )
