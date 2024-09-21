import { createPrescription, getPrescriptionsByPatient, createPrescriptionFromImage , getPrescriptionByUserId} from '../controllers/prescriptionController.js';
import express from 'express'
import multer from 'multer';
import { authorizeCreationMiddleware } from '../middlewares/authorizeCreationMiddleware.js';
import { userMiddleware } from '../middlewares/userMiddleware.js';

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/prescription/create/:patientId',authorizeCreationMiddleware, createPrescription);
router.post('/prescription/createbyimage/:patientId',authorizeCreationMiddleware, upload.single('image'), createPrescriptionFromImage);
router.get('/prescription/:id', getPrescriptionsByPatient);
router.get("/prescription", userMiddleware, getPrescriptionByUserId);


export default router;