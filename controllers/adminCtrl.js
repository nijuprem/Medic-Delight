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

module.exports = { getAllUserController, getAllDoctorsController };
