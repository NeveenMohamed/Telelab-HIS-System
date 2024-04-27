// Imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const appointmentRoute = require("./Appointments/routes/appointmentRoutes");
const userRoute = require("./Registeration/routes/userRoutes");
const recordRoute = require("./EMR/routes/recordRoutes");

// Connect to database
const uri =
  "mongodb+srv://Vena:12345@telelab.urpw51y.mongodb.net/Central?retryWrites=true&w=majority&appName=TeleLab";
const port = 4000;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log("Server up and running"));
  })
  .catch((error) => {
    console.log(error);
  });

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/appointments", appointmentRoute);
app.use("/user", userRoute);
app.use("/record", recordRoute);
