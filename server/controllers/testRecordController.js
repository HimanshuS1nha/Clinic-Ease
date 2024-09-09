import MedicalTest from '../models/testRecordModel.js'
import {ocrImageWithTesseract} from '../utils/imageOCRUtility.js'
import {uploadImageToFirebase} from '../utils/firebaseUtility.js'
import { generate } from '../utils/geminiUtility.js';

export const createMedicalTest = async (req, res) => {
    try {
        const test = new MedicalTest(req.body);
        await test.save();
        res.status(201).json(test);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getMedicalTestByPatient = async (req, res) => {
    try {
        const tests = await MedicalTest.find({ patient: req.params.patientId });
        res.status(200).json(tests);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const createTestRecordByImage = async (req, res) => {
    try {
        const { patientId } = req.body;
        const imageFile = req.file;

        const imageUrl = await uploadImageToFirebase(imageFile);
        const testsText = await ocrImageWithTesseract(imageUrl);

        const data = await generate("tests",testsText);
        const newMedicalTest = new MedicalTest({
            patientId,
            doctorName,
            prescriptionText,
            imageUrl
        });
        // change above this accordingly

        await newMedicalTest.save();
        res.status(201).json(newMedicalTest);
    } catch (error) {
        res.status(500).json({ message: 'Error processing image', error });
    }
};

