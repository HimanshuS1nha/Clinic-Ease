import express from "express";
import {
  createDoctor,
  loginDoctor,
  getDoctors,
  getDoctorById,
} from "../controllers/doctorController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/doctor/create", adminMiddleware, createDoctor);
router.post("/doctor/login", loginDoctor);
router.get("/doctors", getDoctors);
router.get("/doctor/:id", getDoctorById);

export default router;
