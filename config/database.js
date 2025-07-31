const mongoose = require("mongoose");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection failed!", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
