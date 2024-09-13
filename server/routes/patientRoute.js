import express from "express";
import {
  createPatient,
  getPatientById,
  getPatientsByUserId,
} from "../controllers/patientController.js";
import { userMiddleware } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.post("/patient/create", userMiddleware, createPatient);
router.get("/patients", userMiddleware, getPatientsByUserId);

router.get("/patient/:id", getPatientById);

export default router;
