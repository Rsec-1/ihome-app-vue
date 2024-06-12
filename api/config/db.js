var mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables

var connectDB = async () => {
  try {
    var mongoURI = process.env.MONGODB_URI;
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
