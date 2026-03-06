const express = require("express");

const app = express();

// this will match only GET requests to the /user route
app.get("/user", (req, res) => {
  res.send({firstName: "kaushinder", lastName: "singh"});
});

// this will match only POST requests to the /user route
app.post("/user", (req, res) => {
// the data in the database
  res.send("Data received successfully in database!");
});

// this will match only PUT requests to the /user route
app.put("/user", (req, res) => {
    res.send("Updated successfully");
});

// this will match only DELETE requests to the /user route
app.delete("/user", (req, res) => {
    res.send("Deleted successfully");
});

// this will match all the HTTP methods (GET, POST, PUT, DELETE, etc.) for the /test route
app.use("/test", (req, res) => {
  res.send("Hello from the server");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
