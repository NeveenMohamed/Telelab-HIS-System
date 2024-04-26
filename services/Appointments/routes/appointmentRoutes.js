const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/appointmentController");

router.get(
  "/appointment/:appointmentId",
  AppointmentController.getAppointmentByID
);

router.get("/lab/:labId", AppointmentController.getAppointmentByLabID);

router.put("/:appointmentId", AppointmentController.updateAppointmentStatus);

module.exports = router;
