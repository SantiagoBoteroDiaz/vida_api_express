import { Router } from "express";
import { create, deleteDoctor, getAll , getDoctorSpecialty} from '../controllers/doctor.controller.js';


export const doctorRoutes = Router();

doctorRoutes.get('/', getAll);
doctorRoutes.post('/', create);
doctorRoutes.get('/', getDoctorSpecialty); 
doctorRoutes.delete('/:id' , deleteDoctor)