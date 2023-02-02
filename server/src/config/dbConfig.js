const mongoose = require("mongoose");
require("dotenv").config();

// getting dburl from .env variable
const dbUrl = process.env.URL;

// function to connect to database
const connectDB = () => {
  try {
    mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Connected to Database");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
