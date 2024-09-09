import mongoose from 'mongoose'
const patientSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    age: Number,
    gender: String,
    medicalTests: [,
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MedicalTest'
        }

    ],
    prescriptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Prescription'
        }
    ]

},
    { timestamps: true }
);

export default mongoose.model('Patient', patientSchema);
