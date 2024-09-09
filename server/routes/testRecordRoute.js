import { createMedicalTest, getMedicalTestByPatient, createTestRecordByImage } from '../controllers/testRecordController.js';
import { authorizeCreationMiddleware } from '../middlewares/authorizeCreationMiddleware.js';
import express from 'express'
import multer from 'multer';
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

router.post('/testrecord/create',authorizeCreationMiddleware, createMedicalTest);
router.post('/testrecord/createbyimage',authorizeCreationMiddleware,upload.single('image'),  createTestRecordByImage);
router.get('/testrecord/:id', getMedicalTestByPatient);


export default router;