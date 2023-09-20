const dotenv = require("dotenv").config();
const express = require("express");
const color = require("colors");
const morgan = require("morgan");

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// routes

app.get("/", (req, res) => {
  res.status(200).send({
    message: "server running",
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
