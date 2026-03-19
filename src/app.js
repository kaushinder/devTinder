const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookiesParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(cookiesParser());

// Signup Api using POST
app.post("/signup", async (req, res) => {
  // Validation of data
  validateSignUpData(req);

  const { firstName, lastName, emailId, password } = req.body;

  // Encrypting password
  const passwordHash = await bcrypt.hash(password, 10);
  console.log(passwordHash);

  // creating a new instance of the User model
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error creating user" + err.message);
  }
});

// login Api using POST
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // create a JWT token and send it to the client
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790");
      console.log("Generated token: ", token);

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token);
      res.send("Login successful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Error logging in user: " + err.message);
  }
});

// Get user profile details
app.get("/profile", async (req, res) => {
  const cookies = req.cookies;

  const { token } = cookies;

  // Validate my token
  const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");

  const { _id } = decodedMessage;
  console.log("Logged In user is: " + _id);

  res.send("Reading Cookie");
});

// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error fetching user" + err.message);
  }
});

// Feed Api - GET/feed all the users from DB
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Error fetching user" + err.message);
  }
});

// Delete user from DB
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    //  const user = await User.findByIdAndDelete({_id: userId});
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Error deleting user" + err.message);
  }
});

// Update user details in DB
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "skills", "gender", "age"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error("Updates not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("You can add up to 10 skills only");
    }

    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send({
      message: "User updated successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).send("Error updating user: " + err.message);
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
