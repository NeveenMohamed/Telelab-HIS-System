const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/appointmentController");

router.post("/", AppointmentController.bookAppointment);

router.get("/", AppointmentController.getAllAppointments);

router.get("/lab/:labId", AppointmentController.getAppointmentByLabID);

router.delete("/:appointmentId", AppointmentController.cancelAppointment);

module.exports = router;
