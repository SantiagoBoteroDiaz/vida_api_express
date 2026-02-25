import { pool } from "../config/dbconfig.js";

export const create = async ({ name }) => {
    const query = 'insert into santiago_botero.specialty(name)values($1) RETURNING *;'; 
    const values = [name]; 

    try {
        const response = await pool.query(query, values);
        return response.rows[0];
    } catch (error) {
        console.error('Error al crear la especialidad:', error);
        throw error;
    }

}

export const view = async () => { 
    const query = 'select * from santiago_botero.specialty;';
    try {
        const response = await pool.query(query);
        return response.rows;
    } catch (error) {
        console.error('Error al obtener las especialidades:', error);
        throw error;
    }
}  

