const Record = require("../models/Record");
const axios = require("axios");

const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find({});
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
  getAllRecords,
  getRecordsByLabID,
  getRecordsByPatientID,
};
