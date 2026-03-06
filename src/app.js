const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.end("This is a test route.");
});

app.use("/abc", (req, res) => {
  res.end("This is about section.");
});


app.use("/", (req, res) => {
  res.end("Hello World from Express!");
});


app.listen(3000, () => {
  console.log("server is running on port 3000");
});
