const Record = require("../models/Record");
const axios = require("axios");

// This function will be divided into 2 parts (HL7 message in region + database in center)
const createRecord = async (req, res) => {
  try {
    const { appointmentId, labTest } = req.body;

    // Create the slot only if no conflicts are found
    const newRecord = await Record.create({
      appointmentId,
      labTest,
    });

    res.status(201).json({ message: "Success", newRecord: newRecord });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================================================================================= //

const getRecordsByLabID = async (req, res) => {
  try {
    const { labId } = req.params;

    let records = await Record.find({ labId: labId });

    if (records.length == 0) {
      return res
        .status(404)
        .json({ message: "No records found in records list" });
    }

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================================================================================= //

const getRecordsByAppointmentID = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    let records = await Record.find({ appointmentId: appointmentId });

    if (records.length == 0) {
      return res
        .status(404)
        .json({ message: "No records found in records list" });
    }

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRecord,
  getRecordsByLabID,
  getRecordsByAppointmentID,
};
