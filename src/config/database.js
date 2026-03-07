const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kaushindersinghraghav_db_user:q2VYaGyGPF1ZJcXT@cluster0.8deh0eq.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
