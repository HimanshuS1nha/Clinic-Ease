import express from "express";
import {
  bookAppointment,
  getAppointments,
  getAppointmentsByDate,
  getAppointmentsByDoctor,
  getCurrentQueueNumbber,
  markAppointmentCompleted,
} from "../controllers/appointmentController.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
import { doctorMiddleware } from "../middlewares/doctorMiddleware.js";

const router = express.Router();

router.post("/appointments/create", bookAppointment);
router.get("/appointments/:date", getAppointmentsByDate);
router.get("/appointments/doctor", doctorMiddleware, getAppointmentsByDoctor);
router.get("/appointments/current/:date", getCurrentQueueNumbber);
router.post("/appointments/complete", markAppointmentCompleted);
router.get("/appointments", userMiddleware, getAppointments);

export default router;
