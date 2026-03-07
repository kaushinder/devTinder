const express = require("express");

const app = express();

// GET /user => it checks all the app.xxx("matching route") functions

app.use("/", (req, res, next) => {
  // res.send("Handling / route");
  next();
})


app.get(
  "/user",
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    res.send("user route");
  },
);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
