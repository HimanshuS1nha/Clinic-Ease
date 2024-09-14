import express from "express";
import {
  bookAppointment,
  getAppointments,
  getAppointmentsByDate,
  getCurrentQueueNumbber,
  markAppointmentCompleted,
} from "../controllers/appointmentController.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/appointments/create", bookAppointment);
router.get("/appointments/:date", getAppointmentsByDate);
router.get("/appointments/current/:date", getCurrentQueueNumbber);
router.post("/appointments/complete", markAppointmentCompleted);
router.get("/appointments", userMiddleware, getAppointments);

export default router;
