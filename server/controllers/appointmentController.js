import Appointment from "../models/appointmentModel.js";
import Patient from "../models/patientDetailsModel.js";
import Doctor from "../models/doctorModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";



export const bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date } = req.body;
    const appointmentDate = new Date(date);
    const user = await Patient.findById(patientId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const latestAppointment = await Appointment.findOne({
      appointmentDate,
      doctor: doctorId,
    }).sort({ queueNumber: -1 });

    const queueNumber = latestAppointment
      ? latestAppointment.queueNumber + 1
      : 1;

    const newAppointment = new Appointment({
      user: patientId,
      doctor: doctorId,
      appointmentDate,
      queueNumber,
    });

    await newAppointment.save();

    res.status(201).json({ message: "Appointment booked" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patients = await Patient.find({ userId });

    let appointments = [];

    for await (const patient of patients) {
      const dbAppointments = await Appointment.find({
        user: patient._id,
      });

      if (dbAppointments.length !== 0) {
        for await (const appointment of dbAppointments) {
          const doctor = await Doctor.findOne({ _id: appointment.doctor });
          appointments.push({
            id: appointment._id,
            date: appointment.appointmentDate,
            patientName: patient.name,
            doctorName: doctor.name,
            doctorId:doctor._id,
            queueNumber: appointment.queueNumber
          });
          
        }
      }
    }

    return res.status(200).json(appointments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAppointmentsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const appointments = await Appointment.find({
      appointmentDate: new Date(date),
    })
      .populate("user", "name email mobile")
      .populate("doctor", "name doctorType")
      .sort({ queueNumber: 1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const doctor = await Doctor.findOne({ _id: doctorId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Find all appointments for the doctor
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("user", "name email mobile")
      .populate("doctor", "name doctorType")
      .sort({ appointmentDate: 1, queueNumber: 1 });
      
    let appointmentDetails = [];

    for await (const appointment of appointments) {
      
        // Push formatted appointment details to the array
        appointmentDetails.push({
          id: appointment._id,
          appointmentDate: appointment.appointmentDate,
          patientName: appointment.user.name,
          patientId: appointment.user._id,
          status:appointment.status,
          queueNumber: appointment.queueNumber,
        });
    }

    return res.status(200).json(appointmentDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getCurrentQueueNumbber = async (req, res) => {
  try {
    const { date, doctor } = req.params;
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const doctorObjectId = new mongoose.Types.ObjectId(doctor);
    const currentPatient = await Appointment.findOne({
      appointmentDate: { $gte: startOfDay, $lte: endOfDay },
      doctor: doctorObjectId,
      status: "Pending",
    }).sort({ queueNumber: 1 });
    console.log('====================================');
    console.log(currentPatient, doctorObjectId, date);
    console.log('====================================');

    if (!currentPatient) {
      return res.status(404).json({ message: "No pending patients" });
    }

    res.status(200).json({ queueNumber: currentPatient.queueNumber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const markAppointmentCompleted = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    console.log(appointmentId);
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        status: "Completed",
      },
      { new: true }
    );
    console.log(appointment);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res
      .status(200)
      .json({ message: "Appointment marked as completed", appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const markAppointmentLater = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    console.log(appointmentId);
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        status: "Later",
      },
      { new: true }
    );
    console.log(appointment);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res
      .status(200)
      .json({ message: "Appointment marked as completed", appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
