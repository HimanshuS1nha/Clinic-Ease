import Prescription from "../models/prescriptionModel.js";
import { ocrImageWithTesseract } from "../utils/imageOCRUtility.js";
import { uploadImageToFirebase } from "../utils/firebaseUtility.js";
import { generate } from "../utils/geminiUtility.js";

export const createPrescription = async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(201).json({ message: "Prescription created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPrescriptionsByPatient = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
      patient: req.params.patientId,
    });
    res.status(200).json(prescriptions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const createPrescriptionFromImage = async (req, res) => {
  try {
    const { patientId } = req.body;
    const imageFile = req.file;

    const imageUrl = await uploadImageToFirebase(imageFile);
    const prescriptionText = await ocrImageWithTesseract(imageUrl);

    const data = await generate("medicine", prescriptionText);
    const newPrescription = new Prescription({
      patientId,
      doctorName,
      prescriptionText,
      imageUrl,
    });
    // change above this accordingly

    await newPrescription.save();
    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(500).json({ message: "Error processing image", error });
  }
};
