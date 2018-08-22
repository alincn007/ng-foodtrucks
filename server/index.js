const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const chalk = require('chalk');

app.use(bodyParser.json());

var APPLICATION_PORT = 5000;
var MONGODB_URI = "mongodb://localhost:27017/angular-foodtrucks";

// Create link to Angular build directory
// app.use(express.static(__dirname + "/dist/"));

// Catch all other routes and return the index file
app.get("/app/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true})
  .then(
    () => {},
    err => {
      console.log(err);
    }
  );

// API ROUTES BELOW
// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({
    error: message
  });
}

// *** CORS *** //
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-xsrf-token");
  next();
});

const truckRoutes = require("./routes/trucks");

// Trucks
app.get("/api/foodtrucks/", truckRoutes.getAll);
app.get("/api/foodtrucks/day/:day", truckRoutes.getTrucksByDay);
app.get("/api/foodtrucks/:id", truckRoutes.getTrip);
app.post("/api/foodtrucks", truckRoutes.saveTruck);
app.delete("/api/foodtrucks/:id", truckRoutes.deleteTruck);


let port = process.env.PORT || APPLICATION_PORT;
app.listen(port, () => {
    console.log(chalk.green(`   ---> Server running on port ${port}`))
});