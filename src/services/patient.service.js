import { pool } from "../config/dbconfig.js";

export const create = async ({ name , create_date}) => {
    const query = 'insert into santiago_botero.patient(name, birth_date)values($1 , $2) RETURNING *;'; 
    const values = [name,create_date];  
    try {
        const response = await pool.query(query, values);
        return response.rows[0];
    } catch (error) {
        console.error('Error al crear el paciente:', error);
        throw error;
    }
} 

export const view = async () => { 
    const query = 'select * from santiago_botero.patient;';
    try {
        const response = await pool.query(query);
        return response.rows;
    } catch (error) {
        console.error('Error al obtener las especialidades:', error);
        throw error;
    }
}  


export const selectById = async (id) => { 
    const query = 'select * from santiago_botero.patient where id = $1;' ; 
    const value = [id] 
    try {
        const response = await pool.query(query, value);
        return response.rows[0];
    } catch (error) {
        console.error('Error al obtener el paciente:', error);
        throw error;
    }
}  