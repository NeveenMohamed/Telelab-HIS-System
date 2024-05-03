const express = require("express");
const router = express.Router();
const RecordController = require("../controllers/recordController");

router.get("/", RecordController.getAllRecords);

router.get("/lab/:labId", RecordController.getRecordsByLabID);

router.get("/patient/:patientId", RecordController.getRecordsByPatientID);

module.exports = router;
