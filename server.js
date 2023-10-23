const dotenv = require("dotenv").config();
const express = require("express");
const color = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());

// DB connection
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));
app.use(cookieParser());

// // Static files
// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// routes

app.use("/api/v1/user", require("./routes/userRoute"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

const port = process.env.PORT;

app.listen(port, () => {
  // console.log(`Server Running on port ${port}`);
});
