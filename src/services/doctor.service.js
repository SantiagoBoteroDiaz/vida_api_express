import { pool } from "../config/dbconfig.js";

// The original code queried the `test` schema; the rest of the project uses
// `santiago_botero`.  Using the wrong schema will cause SQL errors (table not
// found) and make the `/doctors` endpoints fail with 500s.  Update both the
// stored procedure call and the SELECT to the correct schema.  Adjust as
// needed if your database uses a different schema name.
export const createDoctor = async ({ name, specialty }) => {

    const query = 'CALL santiago_botero.sp_create_doctor($1::text, $2::text, null, null)';
    const values = [name, specialty];

    try {
        const response = await pool.query(query, values);
        return response.rows[0];
    } catch (error) {
        console.error('Error al crear el doctor:', error);
        throw error;
    }

}

export const getAllDoctors = async () => {
  
    const query = `select p.name as nombre_paciente, p.*, d.* from santiago_botero.doctor d
                   inner join santiago_botero.appointment a on a.doctor_id =  d.id
                   inner join santiago_botero.patient p on a.patient_id = p.id`;

    try {
        const response = await pool.query(query);
        return response.rows;
    } catch (error) {
        console.error('Error al obtener los doctores:', error);
        throw error;
    }

}
