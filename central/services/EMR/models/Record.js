const mongoose = require("mongoose");

const recordSchema = mongoose.Schema({
  patientId: {
    type: Number,
    required: [true, "Please enter the patient's ID"],
  },
  labId: {
    type: Number,
    required: [true, "Please enter the lab ID"],
  },
  doctorId: {
    type: Number,
    required: [true, "Please enter the doctor's ID"],
  },
  testType: {
    type: String,
    required: [true, "Please enter the type of the test"],
  },
  reportingDate: {
    type: Date,
    default: Date.now(),
  },
});

const Record = mongoose.model("Record", recordSchema);
module.exports = Record;
