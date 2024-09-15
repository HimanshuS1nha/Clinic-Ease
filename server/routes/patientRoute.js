import express from "express";
import {
  createPatient,
  getAllPatients,
  getPatientById,
  getPatientsByUserId,
} from "../controllers/patientController.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";
import { doctorMiddleware } from "../middlewares/doctorMiddleware.js";

const router = express.Router();

router.post("/patient/create", userMiddleware, createPatient);
router.get("/patients", userMiddleware, getPatientsByUserId);
router.get("/patients/get", doctorMiddleware, getAllPatients);

router.get("/patient/:id", getPatientById);

export default router;
