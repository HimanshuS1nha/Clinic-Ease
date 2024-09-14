import Patient from "../models/patientDetailsModel.js";

export const createPatient = async (req, res) => {
  try {
    const { name, age, gender } = req.body;
    const userId = req.user.id;

    const newPatient = new Patient({
      userId,
      name,
      age,
      gender,
      medicalTests: [],
      prescriptions: [],
    });

    await newPatient.save();
    res.status(201).json({ message: "Patient added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating patient", error });
  }
};

export const getPatientsByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const patients = await Patient.find({ userId }).populate(
      "medicalTests prescriptions"
    );
    if (!patients || patients.length === 0) {
      return res
        .status(404)
        .json({ message: "No patients found for this user" });
    }
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      "medicalTests prescriptions"
    );
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
