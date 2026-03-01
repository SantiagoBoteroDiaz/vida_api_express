import { Router } from "express";
import { getAll } from "../controllers/appointment.controller.js"; 

export const appointmentsRoutes = Router() 

appointmentsRoutes.get('/' , getAll) ; 