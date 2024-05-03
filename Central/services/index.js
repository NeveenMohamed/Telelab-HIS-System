// Imports
const net = require('net');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var hl7 = require("simple-hl7");

const Record = require("./EMR/models/Record")
const Appointment = require("./Appointments/models/Appointment")

const app = express();

const appointmentRoute = require("./Appointments/routes/appointmentRoutes");
const userRoute = require("./Registeration/routes/userRoutes");
const recordRoute = require("./EMR/routes/recordRoutes");
const { log } = require('console');

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


function encode_appointment(message) {

    // Message Header -----------------------------------------------
    var adt = new hl7.Message(
        "Send Record",
        "",
        "",
        "",
        "",
        "",
        ["SIU", "S12"], //Message_Type
        [`${message._id}`],
        "",
        "2.6" //Version_ID
        //Keep adding fields
    );

    // Add Segments --------------------------------------------------

    adt.addSegment(
        "PID",
        "", //Blank field
        [`${message.patient._id}`], //Appointment
        "",
        "",
        ["", `${message.patient.name}`, ""],
        "",
        "",
        "",
        "",
        "",
        [`${message.patient.address}`],
        "",
        [`${message.patient.phone}`]
    );

    adt.addSegment(
        "SCH",
        "",
        "",
        "",
        "",
        "",
        "",
        "CHECKUP", //CHECKUP
        "NORMAL", //NORMAL
        "",
        "",
        [`${message.date}`, `${message.time}`],
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ["", [`${message.status}`]] //Appointments_Status
    );

    adt.addSegment(
        "PV1",
        "",
        "",
        [`${message.labId}`],
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ["", "BOOKED"] //Appointments_Status
    );

    adt.addSegment(
        "OBX",
        1, //Blank field
        [`${message.patient.weight}`, `${message.patient.height}`, `${message.patient.age}`], //Multiple components
        ""
    );
    return adt;

}

function decode_Record_from_Dict(hl7Dict) {
    var Record_id;
    var appointment_id;
    var Specimen_Name;
    var Specimen_date_collection;
    var Result;
    var test_id;

    appointment_id = hl7Dict['PID']['Field 2'];

    Specimen_Name = hl7Dict['OBR']['Field 14'];
    Record_id = hl7Dict['OBR']['Field 11'];
    Specimen_date_collection = hl7Dict['OBR']['Field 7'];

    // Parse the OBX segment to get the result and test ID
    var obxSegment = hl7Dict['OBX'];
    if (obxSegment) {
        Result = obxSegment['Field 2'].split('^');
        test_id = obxSegment['Field 3'];
    }

    // Construct the decoded message object
    var decoded_message = {
        "_id": Record_id,
        "appointmentId": appointment_id,
        "labTest": {
            "WBC": parseInt(Result[0]),
            "RBC": parseInt(Result[1]),
            "HGB": parseInt(Result[2]),
            "HCT": parseInt(Result[3]),
            "MCV": parseInt(Result[4]),
            "MCH": parseInt(Result[5]),
            "MCHC": parseInt(Result[6]),
            "PLT": parseInt(Result[7]),
            "_id": test_id
        },
        "reportingDate": Specimen_date_collection,
        "__v": 0
    };

    return decoded_message;
}


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
                const operationType = change.operationType;
                console.log(JSON.stringify(change))
                console.log(JSON.stringify(change.fullDocument))
                if (collectionInfo.name == 'appointments') {
                    if (operationType == 'insert') {
                        // Send the change data to all connected clients
                        var hl7 = encode_appointment(change.fullDocument);
                        console.log(hl7.log());
                        for (const socket of sockets) {
                            socket.write(JSON.stringify(change.fullDocument));
                        }
                    }
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

        const result_HL7 = data.toString();
        console.log("result_HL7");
        console.log(result_HL7);


        // Initialize an empty dictionary to store the parsed HL7 message
        var hl7Dict = {};

        // Split the message into segments
        var segments = result_HL7.split("\n");
        console.log("segments");
        console.log(segments);

        // Iterate through each segment
        segments.forEach(function (segment) {
            // Split each segment into fields
            var fields = segment.split("|");

            // Check the segment type
            var segmentType = fields[0];

            // Initialize an empty dictionary for the segment
            var segmentDict = {};

            // Add each field to the segment dictionary
            for (var i = 1; i < fields.length; i++) {
                segmentDict["Field " + i] = fields[i];
            }

            // Add the segment dictionary to the main dictionary
            hl7Dict[segmentType] = segmentDict;
        });
        console.log("hl7Dict");
        console.log(hl7Dict);

        // Decode the HL7 message from the dictionary format
        var decodedMessage = decode_Record_from_Dict(hl7Dict);

        console.log("decodedMessage");
        console.log(decodedMessage);
        // console.log('HL7');
        // console.log(result_HL7);
        // 
        // function to decode result_HL7 , input :result_HL7 , output : result
        // my_decoded_message = decode_Record(result_HL7)
        // console.log('my_decoded_message');
        // console.log(my_decoded_message);

        // // Parse the received data as JSON
        // const result = JSON.parse(decodedMessage);
        const record = new Record(decodedMessage);

        try {
            record.save();
            console.log('Saved record to database');
        } catch (error) {
            console.error('Error saving record to database:', error);
        }

        const appoint_id = record.appointmentId;
        console.log(appoint_id);

        // Find the appointment in the Appointment collection based on its ID
        const existingAppointment = await Appointment.findById(appoint_id);

        // Check if the appointment exists
        if (!existingAppointment) {
            console.log('Appointment not found.');
            return;
        }
        else {
            console.log(existingAppointment);
        }

        // Update the status of the found appointment
        existingAppointment.status = 2;

        // Save the updated appointment
        await existingAppointment.save();

        console.log('Appointment status updated successfully:', existingAppointment);

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


