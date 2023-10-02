const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUserController,
  getAllDoctorsController,
  changeAccountStatusController,
} = require("../controllers/adminCtrl");

router.get("/gelAllUsers", authMiddleware, getAllUserController);

router.get("/gelAllDoctors", authMiddleware, getAllDoctorsController);

router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;
