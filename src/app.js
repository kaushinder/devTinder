const express = require("express");

const app = express();

// + means that the preceding character can occur one or more times //abc, abbc, abbbc, etc.
app.get("/user/:userId/:name/:password", (req, res) => {
    // console.log(req.query);
    console.log(req.params);
  res.send({firstName: "kaushinder", lastName: "singh"});
});


app.listen(3000, () => {
  console.log("server is running on port 3000");
});
