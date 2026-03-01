import { pool } from "../config/database/pgConfig.js";
import { Doctor } from "../models/doctors.models.js";

export const createDoctor = async ( name, specialty, id = null) => {
    let query = `insert into santiago_botero.doctor (name, speciality_id)values($1, $2) RETURNING * ; ` 
    let values = [name, specialty]

    if(id !== null) {
        query = 'insert into santiago_botero.doctor(id , name, speciality_id)values($1 , $2, $3) RETURNING *';
        values = [id , name, specialty];      
    }
    console.log(values);
    
    try {
        const response = await pool.query(query, values);
        return response.rows[0];
    } catch (error) {
        console.error('Error al crear el doctor:', error);
        throw error;
    }

}

export const getAllDoctors = async () => {
  
    const query = `select   d.id, d.name , s."name" as specialty_name from santiago_botero.doctor d
    inner join santiago_botero.specialty s on s.id = d.speciality_id;`;

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

export const doctorDelete = async (id) => {

    const query = 'DELETE FROM santiago_botero.doctor WHERE id = $1 RETURNING id, name, speciality_id';
    const values = [id]

    try {

        const response = await pool.query(query, values);

        if (response.rowCount === 0) {
            throw new Error ("No se elimino el doctor")
        }

        // crear informacion en mongo 

        const doctorDeleted = await new Doctor(response.rows[0]).save();
    
        return response;
    } catch (error) {
        console.error('Error al eliminar un doctor' , error)
        throw error;
    }
}

export const updateDoctor = async (id, {name , specialty_id}) => { 
    const query = `
    update santiago_botero.doctor 
    set name = $1 ,
        specialty_id = (select name f)
    `
} 

export const recoveryDoctor = async (doctorName) =>  {
    try {
        //traer informacion de mongo db 
        const doctorDelete = await Doctor.findOne({name: doctorName}) 
       
        // crear el doctor con el metodo anteriormente creado (Ojo el orden es muy importante)

        const  newSpecialty = await createDoctor( doctorDelete.name, doctorDelete.speciality_id, doctorDelete.id) 
        
        // eliminar informacion de mongo db 

        await Doctor.deleteOne({name: doctorName});  

        return newSpecialty
    } catch (error) {
        console.error('no se pudo recuperar el doctor: ' , error);
        
    }
} 

export const getAllDeleteDoctors = async () => {
    try {
        
        //obtener todos los doctores de mongo 
        
        const doctorsDelete = await Doctor.find() 

        //retornamos la respuesta para mostrarla en controllers 
        
        return doctorsDelete 
    } catch (error) {
        
    }
}