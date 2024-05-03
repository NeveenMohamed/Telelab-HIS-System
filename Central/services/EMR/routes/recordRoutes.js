const express = require("express");
const router = express.Router();
const RecordController = require("../controllers/recordController");

router.get("/", RecordController.getAllRecords);

router.get(
  "/appointment/:appointmentId",
  RecordController.getRecordsByAppointmentID
);

router.post("/", RecordController.createRecord);

router.get("/lab/:labId", RecordController.getRecordsByLabID);

module.exports = router;
