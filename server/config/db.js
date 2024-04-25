const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DEV_CONSTRING);
    console.log("connected to database");
  } catch (error) {
    console.error("Error connecting to database\n", error);
    process.exit(0);
  }
};

module.exports = connectDb;
