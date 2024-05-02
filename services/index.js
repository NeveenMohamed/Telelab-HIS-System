// Imports
const net = require('net');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// import axios from "../../../core/api/api";


const app = express();

const appointmentRoute = require("./Appointments/routes/appointmentRoutes");
const userRoute = require("./Registeration/routes/userRoutes");
const recordRoute = require("./EMR/routes/recordRoutes");

// Connect to database
const uri =
    "mongodb+srv://Vena:12345@telelab.urpw51y.mongodb.net/Central?retryWrites=true&w=majority&appName=TeleLab";
const port = 4000;

mongoose.connect(uri)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => console.log("Server up and running"));
        watchAllCollections(uri)
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


// Function to watch all collections for changes
async function watchAllCollections() {
    try {
        const db = mongoose.connection;

        db.on("error", console.error.bind(console, "MongoDB connection error:"));

        // Get a list of all collections in the database
        const collections = await mongoose.connection.db.listCollections().toArray();

        // Watch each collection for changes
        collections.forEach(async (collectionInfo) => {
            const collection = db.collection(collectionInfo.name);
            const changeStream = collection.watch();

            changeStream.on("change", (change) => {
                console.log(`Change detected in ${collectionInfo.name} collection:, change`);
                console.log(JSON.stringify(change.fullDocument))

                // Send the change data to all connected clients
                for (const socket of sockets) {
                    socket.write(JSON.stringify(change.fullDocument));
                }

                // socket.write(JSON.stringify(change));
            });
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


// Create a TCP server
const server = net.createServer();

// Keep track of all connected clients
const sockets = new Set();

server.on('connection', (socket) => {
    console.log('Client connected');
    sockets.add(socket);

    // Handle data from the client
    socket.on('data', async (data) => {
        console.log('Received from client:', data.toString());

        // // Parse the received data as JSON
        const result = JSON.parse(data);
        console.log(result)

        axios.post("http://localhost:3000/record/", result);

    

        // axios.post("http://localhost:4000/appointments/", {
        //     patient: {
        //       name: values.Name,
        //       weight: values.Weight,
        //       height: values.Height,
        //       age: values.Age,
        //       address: values.Address,
        //       phone: values.Phone,
        //     },
        //     labId: values.LabID,
        //     testType: values.TestType,
        //     date: values.Date,
        //     time: values.Time,
        //   });
        // // console.log("#"*50)
        // console.log(appointmentData[0])

        // // Create a new appointment and save it in the database
        // const appointment = new Appointment(appointmentData[0]);
        // try {
        //     await appointment.save();
        //     console.log('Saved appointment to database');
        // } catch (error) {
        //     console.error('Error saving appointment to database:', error);
        // }
    });


    socket.on('end', () => {
        console.log('Client disconnected');
        sockets.delete(socket);
    });
});

// Start the server
const TCP_PORT = 3838;
server.listen(TCP_PORT, () => {
    console.log(`Server is running on port ${TCP_PORT}`);
});


