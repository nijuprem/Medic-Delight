const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");

const getAllUserController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "All users fetched",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching user",
      error,
    });
  }
};
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "All doctors fetched",
      data: doctors,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while fetching doctors",
      error,
    });
  }
};

const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findById({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor request have been ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor === "approved" ? true : false;
    await user.save();
    res.status(200).send({
      message: "Account Status Updated",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Account status",
      error,
    });
  }
};

module.exports = {
  getAllUserController,
  getAllDoctorsController,
  changeAccountStatusController,
};
