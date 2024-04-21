const express = require("express");
const router = express.Router();
const RecordController = require("../controllers/recordController");

router.post("/", RecordController.createRecord);

router.get("/lab/:labId", RecordController.getRecordsByLabID);

router.get("/patient/:patientId", RecordController.getRecordsByPatientID);

module.exports = router;
