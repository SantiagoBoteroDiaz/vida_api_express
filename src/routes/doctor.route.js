import { Router } from "express";
import { create, deleteDoctor, getAll , getDelete, getDoctorSpecialty, recovery} from '../controllers/doctor.controller.js';


export const doctorRoutes = Router();

doctorRoutes.get('/', getAll);
doctorRoutes.post('/', create);
doctorRoutes.get('/', getDoctorSpecialty); 
doctorRoutes.delete('/:id' , deleteDoctor); 
doctorRoutes.post('/recovery', recovery); 
doctorRoutes.get('/delete' , getDelete); 