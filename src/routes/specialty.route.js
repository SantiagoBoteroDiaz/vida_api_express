import { Router } from "express"; 
import { createSpecialty, viewAllSpecialty } from "../controllers/specialty.controller.js";

export const specialtyRoutes = Router();

specialtyRoutes.post('/', createSpecialty); 
specialtyRoutes.get('/', viewAllSpecialty); 