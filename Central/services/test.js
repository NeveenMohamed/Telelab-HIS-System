
var hl7Message = `MSH|^~\\&|Send Record||||||SIU^S12|66335fffdb2e7177e5cd9d25||2.6
PID||66335fffdb2e7177e5cd9d26|||^Omar^||||||5||234
SCH|||||||CHECKUP|NORMAL|||2024-05-29T00:00:00.000Z^12:43||||||||||||||^1
PV1|||1||||||||||||||||||||||^BOOKED
OBX|1|432^324^40|`;

function convertToJSON(decodedMessage) {
    var jsonMessage = {};

    // Mapping between HL7 fields and JSON fields
    var fieldMapping = {
        'MSH': {
            'Field9': '_id',
            'Field2': 'patientId',
            'Field11': 'version'
        },
        'PID': {
            'Field2': '_id',
            'Field5': 'name',
            'Field11': 'age',
            'Field13': 'phone'
        },
        'SCH': {
            'Field7': 'testType',
            'Field11': 'dateTime',
            'Field25': 'status'
        },
        'PV1': {
            'Field3': 'labId',
            'Field25': 'status'
        },
        'OBX': {
            'Field1': 'obsId',
            'Field2': 'result'
        }
    };

    // Convert each segment based on the mapping
    for (var segmentType in decodedMessage) {
        var segment = decodedMessage[segmentType];
        var segmentFields = fieldMapping[segmentType];

        if (segmentFields) {
            for (var hl7Field in segmentFields) {
                var jsonField = segmentFields[hl7Field];
                if (segment[hl7Field]) {
                    jsonMessage[jsonField] = segment[hl7Field];
                }
            }
        }
    }

    message = { "_id": decodedMessage.MSH.Field9, "patient": { "name": "ssgggsfd", "weight": 231, "height": 123, "age": 213, "address": "213", "phone": 321, "_id": "663356447fceef2fded08964" }, "labId": 1, "status": 1, "testType": "CBC", "date": "2024-05-23T00:00:00.000Z", "time": "12:03", "__v": 0 }


    return message;
}

function decode_hl7(hl7Message) {
    var segments = hl7Message.split("\n");
    var decodedMessage = {};

    segments.forEach(function (segment) {
        var fields = segment.split("|");
        var segmentType = fields[0];

        if (!decodedMessage[segmentType]) {
            decodedMessage[segmentType] = {};
        }

        for (var i = 1; i < fields.length; i++) {
            if (fields[i].length > 0) {
                decodedMessage[segmentType]["Field " + i] = fields[i];
            }
        }
    });

    return decodedMessage;
}

var decodedMessage = decode_hl7(hl7Message);
console.log(decodedMessage);

var convertedJSON = convertToJSON(decodedMessage);
console.log(convertedJSON);