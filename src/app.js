const express = require("express");

const app = express();

app.use(
  "/user",
  [(req, res, next) => {
    // Route handler
    // res.send("Route Handler 1");
    console.log("handling the route user1!!");
    next();
  },
  (req, res, next) => {
    console.log("handling the route user2!!");
    // res.send("Response 2");
    next();
  },
  (req, res, next) => {
    console.log("handling the route user3!!");
    // res.send("Response 3");
    next();
  },
  (req, res, next) => {
    console.log("handling the route user4!!");
    res.send("Response 4");
    // next();
  }
]);  

app.listen(3000, () => {
  console.log("server is running on port 3000");
}
); 
