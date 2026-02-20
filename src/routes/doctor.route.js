import { Router } from "express";
import { create, getAll } from '../controllers/doctor.controller.js';


export const router = Router();

router.get('/doctors', getAll);
router.post('/doctors', create);