
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
message = {"_id":"663356447fceef2fded08963","patient":{"name":"ssgggsfd","weight":231,"height":123,"age":213,"address":"213","phone":321,"_id":"663356447fceef2fded08964"},"labId":1,"status":1,"testType":"CBC","date":"2024-05-23T00:00:00.000Z","time":"12:03","__v":0}

// Define the HL7 message as a string
var hl7Message = "MSH|^~\\&|Send Record\nPID||66334a313f1a9b9e3b402ffa||||\nOBR|1||||||2024-05-02T08:09:05.927Z||||66334a523db63ac70b717783|||CBC\nOBX|1|15^85^78^41^456^257^123^278|66334a523db63ac70b717784";

// Initialize an empty dictionary to store the parsed HL7 message
var hl7Dict = {};

// Split the message into segments
var segments = hl7Message.split("\n");
console.log("segments");
console.log(segments);

// Iterate through each segment
segments.forEach(function(segment) {
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

console.log(decodedMessage);