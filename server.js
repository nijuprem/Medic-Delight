const dotenv = require("dotenv").config();
const express = require("express");
const color = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();

// DB connection
connectDB();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// routes

app.use("/api/v1/user", require("./routes/userRoute"));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
