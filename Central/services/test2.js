
function decode_Record_from_Dict(hl7Dict) {
    var Record_id = hl7Dict['MSH']['Field 9'];
    var appointment_id = hl7Dict['PID']['Field 2'];
    var Specimen_Name = hl7Dict['SCH']['Field 7'];
    var Specimen_date_collection = hl7Dict['SCH']['Field 11'].split('^')[0];
    var time = hl7Dict['SCH']['Field 11'].split('^')[1];
    var labId = hl7Dict['PV1']['Field 3'];
    var status = hl7Dict['PV1']['Field 25'].split('^')[1];
    var testType = hl7Dict['OBX']['Field 2'].split('^')[2];
    var date = hl7Dict['SCH']['Field 11'].split('^')[0];

    var decoded_message = {
        "_id": Record_id,
        "patient": {
            "name": hl7Dict['PID']['Field 5'].split('^')[1],
            "weight": parseInt(hl7Dict['PID']['Field 13']),
            "height": parseInt(hl7Dict['PID']['Field 13']),
            "age": parseInt(hl7Dict['PID']['Field 11']),
            "address": hl7Dict['PID']['Field 5'].split('^')[0],
            "phone": hl7Dict['PID']['Field 5'].split('^')[2],
            "_id": hl7Dict['PID']['Field 2']
        },
        "labId": parseInt(labId),
        "status": parseInt(status),
        "testType": testType,
        "date": date,
        "time": time,
        "__v": 0
    };

    return decoded_message;
}

// Define the HL7 message as a dictionary
var hl7Dict = {
    MSH: {
        'Field 1': '^~\\&',
        'Field 2': 'Send Record',
        'Field 8': 'SIU^S12',
        'Field 9': '66335fffdb2e7177e5cd9d25',
        'Field 11': '2.6'
    },
    PID: {
        'Field 2': '66335fffdb2e7177e5cd9d26',
        'Field 5': '^Omar^',
        'Field 11': '5',
        'Field 13': '234'
    },
    SCH: {
        'Field 7': 'CHECKUP',
        'Field 8': 'NORMAL',
        'Field 11': '2024-05-29T00:00:00.000Z^12:43',
        'Field 25': '^1'
    },
    PV1: { 'Field 3': '1', 'Field 25': '^BOOKED' },
    OBX: { 'Field 1': '1', 'Field 2': '432^324^40' }
};

// Decode the HL7 message from the dictionary format
var decodedMessage = decode_Record_from_Dict(hl7Dict);

console.log(decodedMessage);
