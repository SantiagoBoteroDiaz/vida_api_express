import express from 'express';
import { doctorRoutes } from './routes/doctor.route.js';
import { specialtyRoutes } from './routes/specialty.route.js';
import {patientRoutes} from './routes/patient.route.js'
import { appointmentsRoutes } from './routes/appointment.routes.js';

// app tiene que llevar express y luego se le coloca la config para enviar info

const app = express();

// comando para usar formato json para enviar info 

app.use(express.json());

app.use('/doctors', doctorRoutes);
app.use('/specialties', specialtyRoutes);
app.use('/patients' , patientRoutes);
app.use('/appointment', appointmentsRoutes)

export default app;