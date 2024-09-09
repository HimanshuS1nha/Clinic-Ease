import mongoose from 'mongoose';

const testRecordSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Patient',
        required: true
    },
    testName: {
        type: String, 
        required: true
    },
    testDate: {
        type: Date,
        required: true
    },
    result: {
        type: String,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    labName: {
        type: String,
    },
    status: {
        type: String, 
        enum: ['Pending', 'Completed', 'In-Progress'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const TestRecord = mongoose.model('TestRecord', testRecordSchema);

export default TestRecord;
