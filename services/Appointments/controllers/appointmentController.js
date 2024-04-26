const Appointment = require("../models/Appointment");
const axios = require("axios");

const status = {
  InProgress: 1,
  Done: 2,
};

const bookAppointment = async (req, res) => {
  try {
    const { patient, doctorId, labId, time, date, testType } = req.body;

    // Check for existing appointments for the same date
    if (await Appointment.findOne({ date })) {
      return res.status(400).json({
        message: "Appointment already booked for that date",
      });
    }

    const appointment = Appointment.create({
      patient: patient,
      doctorId: doctorId,
      labId: labId,
      date: date,
      testType: testType,
      time: time,
      status: status.InProgress,
    });

    res.status(200).json({ message: "Success", appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================================================================================= //

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================================================================================= //

const getAppointmentByLabID = async (req, res) => {
  try {
    const { labId } = req.params;
    const appointment = await Appointment.find({ labId: labId });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================================================================================= //

const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findOneAndDelete({
      _id: appointmentId,
    });

    if (appointment)
      res.status(200).json({
        message: `Canceled an appointment with Appointment ID: ${appointmentId}`,
      });
    else
      res.status(404).json({
        message: `No Appointment with Appointment ID: ${appointmentId}`,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const timeValidation = () => {
  const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
  if (!timeRegex.test(time)) {
    return json({
      message: "Invalid time format. Use the format HH:mm.",
    });
  }
};

const dateValidation = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(date)) {
    return {
      valid: false,
      message: "Invalid date format. Use the format YYYY-MM-DD.",
    };
  }

  return { valid: true };
};

module.exports = {
  bookAppointment,
  getAllAppointments,
  getAppointmentByLabID,
  cancelAppointment,
};
