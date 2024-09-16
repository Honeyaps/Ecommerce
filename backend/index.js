const express = require("express");
const cors = require("cors");
const mainRouter = require("./mainRoute");
const app = express();

app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "DELETE", "PUT"], 
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use(express.json());

app.use("/v1", mainRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

module.exports = app;
