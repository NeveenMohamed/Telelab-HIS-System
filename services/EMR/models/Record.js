const mongoose = require("mongoose");
const labTestSchema = require("./LabTest");

const recordSchema = mongoose.Schema({
  appointmentId: {
    type: String,
    required: [true],
  },
  labTest: {
    type: labTestSchema,
    required: [true, "Please enter the lab test results"],
  },
  reportingDate: {
    type: Date,
    default: Date.now(),
  },
});

const Record = mongoose.model("Record", recordSchema);
module.exports = Record;
