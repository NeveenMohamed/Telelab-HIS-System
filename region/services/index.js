// Imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Connect to database
const uri =
  "mongodb+srv://<username>:<password>@cluster0.rcyuxj2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const port = 3000;

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
// app.use("/slots", slotRoute);
// app.use("/appointments", appointmentRoute);
