import Prescription from "../models/prescriptionModel.js";
import { uploadImageToFirebase } from "../utils/firebaseUtility.js";
import { generate } from "../utils/geminiUtility.js";

export const createPrescription = async (req, res) => {
  try {
    const { medicines, dosage } = req.body;
    const { patientId } = req.params; 
    const prescription = new Prescription({
      patientId,
      medicines,
      dosage,
    });

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
    const { patientId } = req.params;
    const imageFile = req.file;
    const imageUrl = await uploadImageToFirebase(imageFile);
    const extractedData = await generate(imageFile, "prescription");
    if (!extractedData || extractedData.length === 0) {
      return res.status(400).json({ message: "No medicines found in the image." });
    }
    for (const item of extractedData) {
      const newPrescription = new Prescription({
        patientId,
        medicine: item.medicine,
        dosage: item.dosage,
        imageUrl,
      });

      await newPrescription.save();
    }

    res.status(201).json({
      message: "Prescription(s) created successfully",
    });

  } catch (error) {
    res.status(500).json({ message: "Error processing image", error });
  }
};
