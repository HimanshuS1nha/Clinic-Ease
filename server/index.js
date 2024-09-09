import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import MongoConnection from './config/dbConfig.js'
MongoConnection()
import userRoute from "./routes/userRoute.js";
import doctorRoute from "./routes/doctorRoute.js";
import appointmentRoute from "./routes/appointmentRoute.js";
import patientRoute from "./routes/patientRoute.js";
import prescriptionRoute from "./routes/prescriptionRoute.js";
import testRecordRoute from "./routes/testRecordRoute.js";


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.use('/',
  userRoute,
  doctorRoute,
  appointmentRoute,
  patientRoute,
  prescriptionRoute,
  testRecordRoute
);

app.listen(port, () => console.log(`Running at http://localhost:${port}`));
