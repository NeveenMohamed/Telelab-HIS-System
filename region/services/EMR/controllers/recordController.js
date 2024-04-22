const Record = require("../models/Record");
const axios = require("axios");

// This function will be divided into 2 parts (HL7 message in region + database in center)
const createRecord = async (req, res) => {
  try {
    const { patientId, labId, doctorId, labTest, testType } = req.body;

    // Create the slot only if no conflicts are found
    const newRecord = await Record.create({
      patientId,
      labId,
      doctorId,
      testType,
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

const getRecordsByPatientID = async (req, res) => {
  try {
    const { patientId } = req.params;

    let records = await Record.find({ patientId: patientId });

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
  getRecordsByPatientID,
};
