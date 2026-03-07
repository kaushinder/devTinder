const express = require("express");

const app = express();

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     // Log your error
//     res.status(500).send("something went wrong again");
//   }
// });

app.get("/getUserData", (req, res) => {
  // Logic of DB call and get user Data
  try {
    throw new Error("DB connection failed");
    res.send("User Data is sent to client");
  } catch (error) {
    res.status(500).send("some Error contact support team");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your error
    res.status(500).send("something went wrong again");
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
