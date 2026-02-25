import { Router } from "express";  
import  { createPatient , getAllPatient, searchById} from "../controllers/patient.controller.js" 

export const patientRoutes = Router(); 

patientRoutes.post('/', createPatient) 
patientRoutes.get('/', getAllPatient) 
patientRoutes.get('/:id', searchById) 