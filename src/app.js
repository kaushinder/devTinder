const express = require("express");
const connectDB = require("./config/database");
const app = express();

const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // creating a new instance of the User model
  const user = new User({
    firstName: "yugam",
    lastName: "yadav",
    emailId: "yugam@gmail.com",
    password: "yadav@123",
  });

  try{
    await user.save();
  res.send("User created successfully");
  }
  catch(err){
    res.status(400).send("Error creating user"+ err.message);
  }

});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });
