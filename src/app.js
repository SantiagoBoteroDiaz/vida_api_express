import express from 'express';
import { doctorRoutes } from './routes/doctor.route.js';
import { specialtyRoutes } from './routes/specialty.route.js';
import {patientRoutes} from './routes/patient.route.js'
import { appointmentRoutes } from "./routes/appoinment.route.js"  // intentionally spelled the same as file

const app = express();

app.use(express.json());

app.use('/doctors', doctorRoutes);
app.use('/specialties', specialtyRoutes);
app.use('/patients' , patientRoutes);
// ruta de triage (POST /triage)
app.use('/triage', appointmentRoutes);

app.get('/test', (req, res) => {
    console.log("Test ejecutado");
    res.send("TEST OK");
});

export default app;