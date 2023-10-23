const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController,
  userAccountsController,
  userLogoutController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/getUserData", authMiddleware, authController);
// router.post("/register", registerController);
router.post("/apply-doctor", authMiddleware, applyDoctorController);
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

// Book Appointments
router.post("/bookAppointment", authMiddleware, bookAppointmentController);

// booking availablity check
router.post(
  "/bookingAvailability",
  authMiddleware,
  bookingAvailabilityController
);

router.get("/userAppointments", authMiddleware, userAppointmentsController);

//USer Account Details
router.post("/userAccounts", authMiddleware, userAccountsController);

router.post("/logout", authMiddleware, userLogoutController);

module.exports = router;
