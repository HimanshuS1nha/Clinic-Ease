import { createPrescription, getPrescriptionsByPatient, createPrescriptionFromImage } from '../controllers/prescriptionController.js';
import express from 'express'
import multer from 'multer';
import { authorizeCreationMiddleware } from '../middlewares/authorizeCreationMiddleware.js';

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/prescription/create/:patientId',authorizeCreationMiddleware, createPrescription);
router.post('/prescription/createbyimage/:patientId',authorizeCreationMiddleware, upload.single('image'), createPrescriptionFromImage);
router.get('/prescription/:id', getPrescriptionsByPatient);


export default router;