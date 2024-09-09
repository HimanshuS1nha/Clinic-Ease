import mongoose from 'mongoose';

const PrescriptionSchema = new mongoose.Schema({
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient', 
        required: true 
    },
    medicine: { 
        type: String, 
        required: true 
    },
    dosage:{
        type:Number,
        required:true
    },
    imageUrl: { 
        type: String 
    }
}, { timestamps: true });


export default mongoose.model('Prescription', PrescriptionSchema);
