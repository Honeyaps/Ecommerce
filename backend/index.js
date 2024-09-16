const express = require("express");
const cors = require("cors");
const mainRouter = require("./mainRoute");
const app = express();

app.use(
  cors({
    origin: "*", // Allow requests from all origins
    methods: ["GET", "POST", "DELETE", "PUT"], // Allow specific HTTP methods
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
