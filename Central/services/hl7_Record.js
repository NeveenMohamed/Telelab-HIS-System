var hl7 = require("simple-hl7");

message = {"_id":"6633271870706b2f13b24570","appointmentId":"66331fe28d8642d30034462b","labTest":{"WBC":1,"RBC":2,"HGB":3,"HCT":4,"MCV":5,"MCH":6,"MCHC":7,"PLT":8,"_id":"6633271870706b2f13b24571"},"reportingDate":"2024-05-02T05:38:40.407Z","__v":0}


function encode_Record(message){
  // Message Header -----------------------------------------------
  var adt = new hl7.Message(
    "Send Record"
    //Keep adding fields
  );

  // Add Segments --------------------------------------------------
  adt.addSegment(
    "PID",
    "", //Blank field
    [`${message.appointmentId}`], //Appointment
    "",
    "",
    "",
    ""
  );

  adt.addSegment(
    "OBR",
    1, //Blank field
    "", //Multiple components
    "",
    "",
    "",
    "",
    `${message.reportingDate}`,//Specimen_date_collection 
    "",
    "",
    "",
    `${message._id}`,
    "",
    "",
    "CBC"
  );

  adt.addSegment(
    "OBX",
    1, //Blank field
    [`${message.labTest.WBC}`,`${message.labTest.RBC}`,`${message.labTest.HGB}`,`${message.labTest.HCT}`,
    `${message.labTest.MCV}`,`${message.labTest.MCH}`,`${message.labTest.MCHC}`,`${message.labTest.PLT}`], //Multiple components
    [`${message.labTest._id}`],
  );
  return adt
}

var adt_hl7 = encode_Record(message) 
  
// ---------------------------------------------
console.log(adt_hl7.log());

function decode_Record(adt_hl7){
  //Parse any HL7 message string, could be from File, TCP Socket, Web Service
  var parser = new hl7.Parser(); 

  var msg = parser.parse(adt_hl7.toString());
 
  var Record_id;
  var appointment_id;
  var Specimen_Name;
  var Specimen_date_collection; 
  var Result;
  var test_id;


  msg.getSegments("PID").forEach(function(segment) {
    appointment_id = segment.fields[1].value[0][0];
    // console.log(appointment_id);
  });

  msg.getSegments("OBR").forEach(function(segment) {
    Specimen_Name = segment.fields[13].value[0][0];
    Record_id = segment.fields[10].value[0][0];
    Specimen_date_collection = segment.fields[6].value[0][0];
    console.log(Record_id);
    // console.log(Specimen_Name);
    // console.log(Specimen_date_collection);
  });

  msg.getSegments("OBX").forEach(function(segment) {
    Result = segment.fields[1].value[0];
    test_id = segment.fields[2].value[0][0];
    // console.log(Result); 
    // console.log(test_id);
  });

  const date = new Date(Specimen_date_collection.value[0]);
  decoded_message = {"_id":Record_id.value[0],"appointmentId":appointment_id.value[0],"labTest":
  {"WBC":parseInt(Result[0].value[0]),"RBC":parseInt(Result[1].value[0]),"HGB":parseInt(Result[2].value[0]),
  "HCT":parseInt(Result[3].value[0]),"MCV":parseInt(Result[4].value[0]),"MCH":parseInt(Result[5].value[0]),
  "MCHC":parseInt(Result[6].value[0]),"PLT":parseInt(Result[7].value[0]),"_id":test_id.value[0]},
  "reportingDate":date,"__v":0}

  // console.log(decoded_message)
  return decoded_message
}

my_decoded_message = decode_Record(adt_hl7)
console.log(my_decoded_message)
