const express = require("express");
const router = express.Router();
const RecordController = require("../controllers/recordController");

router.get("/", RecordController.getAllRecords);

router.get(
  "/appointment/:appointmentId",
  RecordController.getRecordsByAppointmentID
);

module.exports = router;
