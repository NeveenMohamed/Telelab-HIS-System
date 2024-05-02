const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var net = require("net");
const axios = require("axios");

const app = express();

const appointmentRoute = require("./Appointments/routes/appointmentRoutes");
const userRoute = require("./Registeration/routes/userRoutes");
const recordRoute = require("./EMR/routes/recordRoutes");

// Connect to database
const url =
  "mongodb+srv://Vena:12345@telelab.urpw51y.mongodb.net/Region?retryWrites=true&w=majority&appName=TeleLab";
const port = 4000;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB from index file");
    app.listen(port, () => console.log("Back Server up and running"));
    watchAllCollections();
    console.log("Listening....");
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/appointments", appointmentRoute);
app.use("/user", userRoute);
app.use("/record", recordRoute);

// Create a TCP client
const client_TCP = new net.Socket();

// Connect to the server
const PORT = 3838;
const HOST = "41.46.96.67";

client_TCP.connect(PORT, HOST, () => {
  console.log("Connected to server from client file");
  // No need to send initial message here
});

// Handle data from the server
client_TCP.on("data", (data) => {
  console.log("Received from server:", data.toString());
});

// Handle connection closure
client_TCP.on("close", () => {
  console.log("Connection closed");
});

// Function to watch all collections for changes
async function watchAllCollections() {
  try {
    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    // Get a list of all collections in the database
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    // Watch each collection for changes
    collections.forEach(async (collectionInfo) => {
      const collection = db.collection(collectionInfo.name);
      const changeStream = collection.watch();

      changeStream.on("change", (change) => {
        console.log(
          `Change detected in ${collectionInfo.name} collection:, change`
        );
        client_TCP.write(JSON.stringify(change.fullDocument));

        // Make an HTTP POST request to create a new record
        axios
          .post("http://localhost:4000/appointment", change.fullDocument)
          .then((response) => {
            console.log("Record created:", response.data);
          })
          .catch((error) => {
            console.error("Error creating record:", error.message);
          });

      });
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

