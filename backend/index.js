const express = require("express");
const cors = require("cors");
const mainRouter = require("./mainRoute");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "HEAD", "OPTIONS"],
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json());

app.use("/v1", mainRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(4900, () => console.log("Port connected"));
