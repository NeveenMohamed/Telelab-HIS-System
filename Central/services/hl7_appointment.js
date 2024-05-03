var hl7 = require("simple-hl7");

message = { "_id": "663356447fceef2fded08963", "patient": { "name": "ssgggsfd", "weight": 231, "height": 123, "age": 213, "address": "213", "phone": 321, "_id": "663356447fceef2fded08964" }, "labId": 1, "status": 1, "testType": "CBC", "date": "2024-05-23T00:00:00.000Z", "time": "12:03", "__v": 0 }

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

my_adt = encode_appointment(message);

// print HL7 message -----------------------------------------------
console.log(my_adt.log());

//Parse any HL7 message string, could be from File, TCP Socket, Web Service
var parser = new hl7.Parser();

var msg = parser.parse(my_adt.toString());

msg.getSegments("PID").forEach(function (segment) {
  var PatientID = segment.fields[1].value[0][0];
  var Patient_Name = segment.fields[4].value[0][1];
  var Patient_Address = segment.fields[10].value[0][0];
  var Phone_Number = segment.fields[12].value[0][0];

  console.log(Phone_Number);
});

msg.getSegments("SCH").forEach(function (segment) {
  var Schedule_ID = segment.fields[4].value[0][0];
  var Appointment_Reason = segment.fields[6].value[0][0];
  var Appointment_Type = segment.fields[7].value[0][0];
  var Appointment_Timing = segment.fields[10].value[0][0];
  var Appointment_Status = segment.fields[24].value[0][1];

  console.log("Schedule ID:", Schedule_ID);
  console.log("Appointment Reason:", Appointment_Reason);
  console.log("Appointment Type:", Appointment_Type);
  console.log("Appointment Timing:", Appointment_Timing);
  console.log("Appointment Status:", Appointment_Status);
});

msg.getSegments("PV1").forEach(function (segment) {
  // Extract relevant fields from the PV1 segment
  const chosenLab = segment.fields[2].value[0][0];
  const appointmentsStatus = segment.fields[24].value[0][1];
  // Log the extracted information
  console.log("Chosen Lab:", chosenLab);
  console.log("Appointments Status:", appointmentsStatus);
});

msg.getSegments("OBX").forEach(function (segment) {
  var Result = segment.fields[1].value[0][0];
  var test_id = segment.fields[2].value[0][0];
  console.log(Result);
  console.log(test_id);
});
