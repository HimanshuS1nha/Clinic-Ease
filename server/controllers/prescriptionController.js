import Prescription from "../models/prescriptionModel.js";
import User from "../models/userModel.js";
import Patient from "../models/patientDetailsModel.js";
import { uploadImageToFirebase } from "../utils/firebaseUtility.js";
import { generate } from "../utils/geminiUtility.js";

export const createPrescription = async (req, res) => {
  try {
    console.log(req.body);
    const { medicines, dosages } = req.body;
    const { patientId } = req.params;

    if (medicines.length !== dosages.length) {
      return res.status(400).json({
        error: "Some error occured. Please refresh the page and try again",
      });
    }

    for (let i = 0; i < medicines.length; i++) {
      const prescription = new Prescription({
        patientId,
        medicine: medicines[i],
        dosage: dosages[i],
      });

      await prescription.save();
    }

    console.log("====================================");
    console.log("====================================");
    res.status(201).json({ message: "Prescription created successfully" });
  } catch (err) {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
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

export const getPrescriptionByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patients = await Patient.find({ userId });

    let prescriptions = [];

    for await (const patient of patients) {
      const dbPrescriptions = await Prescription.find({
        patientId: patient._id,
      });

      if (dbPrescriptions.length !== 0) {
        for await (const prescription of dbPrescriptions) {
          prescriptions.push({
            id: prescription._id,
            medicine: prescription.medicine,
            dosage: prescription.dosage,
            imageUrl: prescription.imageUrl,
            patientName: patient.name,
            createdAt: prescription.createdAt,
          });
        }
      }
    }

    return res.status(200).json(prescriptions);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const createPrescriptionFromImage = async (req, res) => {
  try {
    const { patientId } = req.params;
    const imageFile = req.file;
    const imageUrl = await uploadImageToFirebase(imageFile);
    const extractedData = await generate(imageFile, "prescription");
    if (!extractedData || extractedData.length === 0) {
      return res
        .status(400)
        .json({ message: "No medicines found in the image." });
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
