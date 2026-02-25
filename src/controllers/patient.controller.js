import {create , view, selectById} from "../services/patient.service.js" 


export const createPatient = async (req, res) => {
    const { name , create_date } = req.body;
    try {
        const newPatient = await create({ name, create_date });
        res.status(201).json({
            data: newPatient
        });

    } catch (error) {
        console.error('Error al crear el pacinte', error);
        res.status(500).json({ error: error.message });
    }
}; 


export const getAllPatient = async (req, res) => {
    try {
        const patients = await view();
        res.status(200).json({ response: patients });
    } catch (error) {
        console.error('Error al obtener los pacientes:', error);
        res.status(500).json({ error: error.message });
    }
};

export const searchById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const findPatient = await selectById(id);
        res.status(200).json({
            data: findPatient
        });

    } catch (error) {
        console.error('Error al buscar el pacinte', error);
        res.status(500).json({ error: error.message });
    }
}; 