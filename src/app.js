const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

// Handle Auth middleware for all GET,POST,PUT,DELETE requests to /admin route
app.use("/admin", adminAuth);
// app.use("/user", userAuth);


app.post("/user/login", (req, res) => {
  res.send("User logged in");
})

app.get("/user/data", userAuth, (req, res) => {
  res.send("User gets the data");
});

app.get("/admin/getAllData", (req, res) => {
  // logic of checking if the request is authorized or not
  res.send("All data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("User deleted");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
