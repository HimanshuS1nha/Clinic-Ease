import express from "express";
import {
  bookAppointment,
  getAppointmentsByDate,
  getCurrentQueueNumbber,
  markAppointmentCompleted,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/appointments/create", bookAppointment);
router.get("/appointments/:date", getAppointmentsByDate);
router.get("/appointments/current/:date", getCurrentQueueNumbber);
router.post("/appointments/complete", markAppointmentCompleted);

export default router;
