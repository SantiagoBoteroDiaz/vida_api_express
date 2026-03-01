import { pool } from "../config/dbconfig.js";

export const createDoctor = async ({ name, specialty }) => {

    const query = 'CALL test.sp_create_doctor($1::text, $2::text, null, null)';
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

export const  getDoctorsBySpecialty = async(id) =>{
    const value = [id] 
    const query = ` select d.id, d.name , s."name" 
    from santiago_botero.doctor d 
    inner join specialty s on d.speciality_id = s.id 
    where d.speciality_id  = $1;` 

    try {
        const response = await pool.query(query, value) 
    } catch(error) { 
        console.error(error); 
        throw error  
    }
} 

export const  doctorDelete = async(id) =>{
    const value = [id] 
    const query = `delete from santiago_botero.doctor d where d.id = $1` 
    try {
        const response = await pool.query(query, value) ;
        return response.rowCount;
    } catch(error) { 
        console.error(error); 
        throw error  
    }
} 

export const updateDoctor = async (id, {name , specialty_id}) => { 
    const query = `
    update santiago_botero.doctor 
    set name = $1 ,
        specialty_id = (select name f)
    `
}