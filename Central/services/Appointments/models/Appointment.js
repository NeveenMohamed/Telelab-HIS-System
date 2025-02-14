const mongoose = require("mongoose");
const patientSchema = require("./Patient");

const appointmentSchema = mongoose.Schema({
  patient: {
    type: patientSchema,
    required: [true, "Please enter patient information"],
  },
  labId: {
    type: Number,
    required: [true, "Please enter lab id"],
  },
  status: {
    type: Number,
  },
  testType: {
    type: String,
    default: "CBC",
  },
  date: {
    type: Date,
    required: [true, "Please enter the appointment's date"],
  },
  time: {
    type: String,
    required: [true, "Please enter the appointment's time"],
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
