import MedicalTest from "../models/testRecordModel.js";
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import Patient from "../models/patientDetailsModel.js";
import { ocrImageWithTesseract } from "../utils/imageOCRUtility.js";
import { uploadImageToFirebase } from "../utils/firebaseUtility.js";
import { generate } from "../utils/geminiUtility.js";

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

export const getMedicalTestsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patients = await Patient.find({ userId });

    let tests = [];

    for await (const patient of patients) {
      const dbTests = await MedicalTest.find({
        user: patient._id,
      });

      if (dbTests.length !== 0) {
        for await (const test of dbTests) {
          const doctor = await Doctor.findOne({ _id: test.doctor });
          tests.push({
            id: test._id,
            testName: test.testName,
            testDate: test.testDate,
            patientName: patient.name,
            doctorName: doctor.name,
            labName: test.labName,
            status: test.status,
            result: test.result,
          });
        }
      }
    }

    return res.status(200).json(tests);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const createTestRecordByImage = async (req, res) => {
  try {
    const { patientId } = req.body;
    const imageFile = req.file;

    const imageUrl = await uploadImageToFirebase(imageFile);
    const testsText = await ocrImageWithTesseract(imageUrl);

    const data = await generate("tests", testsText);
    const newMedicalTest = new MedicalTest({
      patientId,
      doctorName,
      prescriptionText,
      imageUrl,
    });
    // change above this accordingly

    await newMedicalTest.save();
    res.status(201).json(newMedicalTest);
  } catch (error) {
    res.status(500).json({ message: "Error processing image", error });
  }
};
