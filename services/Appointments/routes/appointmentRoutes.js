const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/appointmentController");

router.post("/", AppointmentController.bookAppointment);

router.get("/", AppointmentController.getAllAppointments);

router.get(
  "/appointment/:appointmentId",
  AppointmentController.getAppointmentByID
);

router.delete("/:appointmentId", AppointmentController.cancelAppointment);

router.get("/lab/:labId", AppointmentController.getAppointmentByLabID);

router.put("/:appointmentId", AppointmentController.updateAppointmentStatus);

module.exports = router;
