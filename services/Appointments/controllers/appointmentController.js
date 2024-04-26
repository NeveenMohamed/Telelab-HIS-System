const Appointment = require("../models/Appointment");
const axios = require("axios");

const status = {
  InProgress: 1,
  Done: 2,
};

const getAppointmentByID = async (req, res) => {
  const { appointmentId } = req.params;
  try {
    const appointment = await Appointment.find({ _id: appointmentId });
    res.status(200).json(appointment);
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

const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findOneAndUpdate(
      { _id: appointmentId },
      req.body
    );

    if (appointment) res.status(200).json({ message: "Success", appointment });
    else
      res.status(404).json({
        message: `No Appointment found for the given appointmentId`,
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
  getAppointmentByID,
  getAppointmentByLabID,
  updateAppointmentStatus,
};
