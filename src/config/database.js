const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kaushindersinghraghav_db_user:<db_password>@cluster0.8deh0eq.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
