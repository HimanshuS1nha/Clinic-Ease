import Appointment from "../models/appointmentModel.js";
import Patient from "../models/patientDetailsModel.js";
import Doctor from "../models/doctorModel.js";

export const bookAppointment = async (req, res) => {
  try {
    const { userId, doctorId, appointmentDate } = req.body;

    const user = await Patient.findById(userId);
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
      user: userId,
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
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("user", "name email mobile")
      .populate("doctor", "name doctorType")
      .sort({ appointmentDate: 1, queueNumber: 1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCurrentQueueNumbber = async (req, res) => {
  try {
    const { date, doctorId } = req.params;

    const currentPatient = await Appointment.findOne({
      appointmentDate: new Date(date),
      doctor: doctorId,
      status: "Pending",
    }).sort({ queueNumber: 1 });

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
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        status: "Completed",
      },
      { new: true }
    );

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
