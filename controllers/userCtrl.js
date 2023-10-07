const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const dayjs = require("dayjs");
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      console.log("User Already Exists");
      res.status(200).send({
        success: false,
        message: "User Already Exists",
      });
    }

    if (req.body.password !== req.body.secondPassword) {
      console.log("Password and confirm Password do not match");
      return res.status(200).send({
        success: false,
        message: "Passwords do not match",
      });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    req.body.password = hashedPassword;

    // const newUser = new userModel(req.body);
    // await newUser.save();

    if (!existingUser) {
      userModel
        .create(req.body)
        .then(() => {
          console.log("Added to DB");
          return res.status(201).send({
            success: true,
            message: `Registered Successfully`,
          });
        })
        .catch((err) => {
          console.log(`Error in adding to DB, ${err}`);
          return;
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User Not found",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Incorrect email/password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successful",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Login Controller ${error.message}`,
    });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        success: false,
        message: `user not found`,
      });
    } else {
      // console.log(req.body.userId);
      return res.status(200).send({
        success: true,
        message: `auth successfull`,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `auth error`,
      error,
    });
  }
};

const applyDoctorController = async (req, res) => {
  try {
    const user = await userModel.find({});
    const checkDoctor = await doctorModel.findOne({
      userId: req.body.userId,
    });
    if (checkDoctor) {
      res.status(200).send({
        success: false,
        message: "Doctor Already Applied",
      });
    } else {
      const newDoctor = await doctorModel.create({
        ...req.body,
        status: "pending",
      });
      const adminUser = await userModel.findOne({ isAdmin: true });
      const notification = adminUser.notification;

      notification.push({
        type: "apply-doctor-request",
        message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
        data: {
          doctorId: newDoctor._id,
          name: newDoctor.firstName + " " + newDoctor.lastName,
          onClickPath: "/admin/doctors",
        },
      });

      await userModel.findByIdAndUpdate(adminUser._id, { notification });
      res.status(201).send({
        success: true,
        message: "Doctor Account Applied Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Applying for Doctor",
    });
  }
};

const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seenNotification = user.seenNotification;
    const notification = user.notification;

    seenNotification.push(...notification);
    user.notification = [];
    user.seenNotification = seenNotification;
    const updatedUser = await user.save();
    res.status(200).send({
      message: "All notification marked as read",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in notification",
      error,
    });
  }
};

const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.notification = [];
    user.seenNotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      message: "User deleted successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting notification",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Fetched all the doctors",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching doctors",
      error,
    });
  }
};

const bookAppointmentController = async (req, res) => {
  try {
    // const parsedDate = dayjs(req.body.date, {
    //   format: "DD-MM-YYYY",
    //   locale: "en",
    // });
    // console.log("Parsed date:", parsedDate);
    // req.body.date = parsedDate.toISOString();

    // const parsedTime = dayjs(req.body.time, {
    //   format: "HH:mm",
    //   locale: "en",
    // });
    // req.body.time = parsedTime.toISOString();
    // console.log("Parsed time:", parsedTime);
    req.body.status = "pending";
    const newAppointment = await appointmentModel.create(req.body);
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `An Appointment Request from ${req.body.userInfo.name} on ${req.body.date} at ${req.body.time[0]}`,
      onClickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Booked succesfully",
      data: newAppointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in booking appointments",
      error,
    });
  }
};

const bookingAvailabilityController = async (req, res) => {
  try {
    const date = req.body.date;

    const fromTime = dayjs(req.body.time, {
      format: "HH:mm",
      locale: "en",
    });
    const parsedTime = fromTime.subtract(1, "hours");
    req.body.time = parsedTime.toISOString();

    const toTime = dayjs(req.body.time, {
      format: "HH:mm",
      locale: "en",
    });
    const parsedTime2 = toTime.add(1, "hours");
    req.body.time = parsedTime2.toISOString();

    const doctorId = req.body.doctorId;

    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });

    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in booking",
      error,
    });
  }
};

const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    return res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user appointments",
      error,
    });
  }
};

const userAccountsController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });

    const isMatch = await bcrypt.compare(req.body.oldpassword, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Old Password Do not match",
      });
    } else if (req.body.password !== req.body.secondPassword) {
      return res.status(200).send({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    req.body.password = hashedPassword;
    const newUser = await userModel.findByIdAndUpdate(
      { _id: req.body.userId },
      req.body
    );
    await newUser.save();
    res.status(200).send({
      success: true,
      message: "Updated Account Successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating account",
      error,
    });
  }
};

module.exports = {
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
};
