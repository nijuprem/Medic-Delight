const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUserController,
  getAllDoctorsController,
} = require("../controllers/adminCtrl");

router.get("/gelAllUsers", authMiddleware, getAllUserController);

router.get("/gelAllDoctors", authMiddleware, getAllDoctorsController);

module.exports = router;
