const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    slotId: {
      type: String,
      required: [true, "Please enter slot id"],
    },
    patientId: {
      type: Number,
      required: [true, "Please enter patient id"],
    },
    labId: {
      type: Number,
      required: [true, "Please enter lab id"],
    },
    status: {
      type: Number,
      required: [true, "Please enter the appointment's status"],
    },
    date: {
      type: Date,
      required: [true, "Please enter the appointment's date"],
    },
    time: {
      type: String,
      required: [true, "Please enter the appointment's time"],
    },
  },
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
