import express from "express";
import {
  bookAppointment,
  getAppointments,
  getAppointmentsByDate,
  getAppointmentsByDoctor,
  getCurrentQueueNumbber,
  markAppointmentCompleted,
  markAppointmentLater,
} from "../controllers/appointmentController.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
import { doctorMiddleware } from "../middlewares/doctorMiddleware.js";

const router = express.Router();

router.post("/appointments/create", userMiddleware, bookAppointment);
router.get("/appointments/doctor", doctorMiddleware,getAppointmentsByDoctor);
router.post("/appointments/complete",doctorMiddleware, markAppointmentCompleted);
router.post("/appointments/later",doctorMiddleware, markAppointmentLater);
router.get("/appointments/:date",doctorMiddleware, getAppointmentsByDate);
router.get("/appointments/current/:date/:doctor", getCurrentQueueNumbber);
router.get("/appointments", userMiddleware, getAppointments);

export default router;
