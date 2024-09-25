import mongoose from "mongoose";

const testRecordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  testDate: {
    type: Date,
    required: true,
  },
  testName: {
    type: String,
    required: true,
  },
  result: {
    type: String,
  },
  labName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TestRecord = mongoose.model("TestRecord", testRecordSchema);

export default TestRecord;
