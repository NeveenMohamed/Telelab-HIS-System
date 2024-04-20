const Slot = require("../models/Slot");
const Appointment = require("../models/Appointment");
const axios = require("axios");

// Map weekdays to numeric representation
const weekdaysMap = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

// This function will be divided into 2 parts (HL7 message in region + database in center)
const createSlot = async (req, res) => {
  try {
    const { labId, time, weekDay } = req.body;

    // Validate the time format using a regular expression
    const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    if (!timeRegex.test(time)) {
      return res.status(400).json({
        message: "Invalid time format. Use the format HH:mm.",
      });
    }

    // Check for existing slots with the same doctor, date, and different clinic
    const existingSlot = await Slot.findOne({
      labId,
      time,
      weekDay,
    });
    if (existingSlot) {
      return res.status(400).json({
        message: "Lab already isn't available at that time and date",
      });
    }

    // Create the slot only if no conflicts are found
    const newSlot = await Slot.create({
      labId,
      time,
      weekDay,
    });

    res.status(201).json({ message: "Success", newSlot });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ================================================================================= //

const getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find({});
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: "No slots found" });
  }
};

// ================================================================================= //

const getSlotsByLabID = async (req, res) => {
  try {
    const { labId } = req.params;
    const { unscheduled } = req.query;

    let slots = await Slot.find({ labId: labId });
    const scheduled = await Appointment.find({ labId: labId });

    if (unscheduled == "true") {
      // Filter out slots that have corresponding appointments
      slots = slots.filter((slot) => {
        return !scheduled.some((appointment) => appointment.slotId == slot._id);
      });
    }

    res.status(200).json(slots);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Something went wrong, Please try again later!` });
  }
};

// ================================================================================= //

// This function will be divided into 2 parts (HL7 message in region + database in center)
const updateSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    const slot = await Slot.findOneAndUpdate({ _id: slotId }, req.body);

    if (slot) res.status(200).json({ message: "Success" });
    else
      res.status(404).json({
        message: `No slot found with ID: ${slotId}`,
      });
  } catch (error) {
    res.status(500).json({ message: "No slots found" });
  }
};

// ================================================================================= //

// This function will be divided into 2 parts (HL7 message in region + database in center)
const deleteSlot = async (req, res) => {
  try {
    const { slotId } = req.params;

    const slot = await Slot.findOneAndDelete({ _id: slotId });

    await Appointment.findOneAndDelete({ slotId: slotId });

    if (slot) res.status(200).json({ message: "Success" });
    else
      res.status(404).json({
        message: `No slot found with ID: ${slotId}`,
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
  createSlot,
  getAllSlots,
  getSlotsByLabID,
  updateSlot,
  deleteSlot,
};
