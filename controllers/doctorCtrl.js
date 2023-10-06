const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const userModel = require("../models/userModel");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      data: doctor,
      message: "Doctor Data fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor",
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Doctor profile update issue",
      error,
      success: false,
    });
  }
};

// Get single doctor for booking
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findById({
      _id: req.body.docId,
    });
    res.status(200).send({
      message: "Doctor Found",
      data: doctor,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Doctor could not be found",
      error,
      success: false,
    });
  }
};

const drAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({
      userId: req.body.userId,
    });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      message: "Doctor Appointments fetched successfully",
      data: appointments,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in DOc Appointments",
      error,
      success: false,
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status: status }
    );
    const user = await userModel.findById({ _id: appointments.userId });
    const notifications = user.notification;
    await notifications.push({
      type: "status-updated",
      message: `Your Doctor's appointment has been ${status}`,
      onClickPath: "/drAppointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Updating Status",
    });
  }
};

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  drAppointmentsController,
  updateStatusController,
};
