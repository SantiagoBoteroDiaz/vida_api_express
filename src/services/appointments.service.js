import { pool } from "../config/database/pgConfig.js";

export const  getAllAppoiments = async () => { 
    const query = `
    SELECT 
    p.name AS nombre_del_paciente,
    d."name" AS nombre_doctor,
    s.name AS especialidad,
    a."date",
    a."cost",
    a.diagnosis
    FROM santiago_botero.appointment a
    INNER JOIN santiago_botero.patient p 
    ON p.id = a.patient_id
    INNER JOIN santiago_botero.doctor d 
    ON d.id = a.doctor_id
    INNER JOIN santiago_botero.specialty s 
    ON s.id = d.speciality_id limit 100;
    `

    try {
        const response = await pool.query(query) 
        return response.rows
    } catch (error) { 
        console.error("error al obtener las citas" , error);
        throw error
    }
}