const Appointment = require("../models/Appointment");
const Slot = require("../models/Slot");
const axios = require("axios");

const status = {
  InProgress: 1,
  Done: 2,
};

const weekDays = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

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

module.exports = {
  getAppointmentByLabID,
  updateAppointmentStatus,
};
