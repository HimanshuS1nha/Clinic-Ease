import Doctor from '../models/doctorModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createDoctor = async (req, res) => {
    try {
        const { name, email, password, doctorType } = req.body;
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: "Doctor already exists with this email" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = new Doctor({
            name,
            email,
            password: hashedPassword,
            doctorType
        });

        await newDoctor.save();
        res.status(201).json({ message: "Doctor created successfully", doctor: newDoctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, doctor.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: doctor._id , role:'doctor'}, process.env.JWT_TOKEN, { expiresIn: '1h' });

        res.cookie("authorization", token, {
            path: "/",
            expires: new Date(Date.now() + (7*86400000)),
            secure: true,
            httpOnly: true,
            sameSite: "None",
          });

        res.status(200).json({ message: "Logged in successfully", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
export const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().select('id name email doctorType');
        res.status(200).json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
export const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findById(id).select('name email doctorType');

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
