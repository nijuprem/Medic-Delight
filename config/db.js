const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log(`connected to DB ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Error in connecting to DB ${error}`);
  }
};

module.exports = connectDB;
