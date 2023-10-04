const doctorModel = require("../models/doctorModel");

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

module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
};
