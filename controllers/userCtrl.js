const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
        data: {
          name: user.name,
          email: user.email,
        },
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

module.exports = { loginController, registerController, authController };
