import {create , view} from "../services/specialty.service.js";

export const createSpecialty = async (req, res) => {
    const { name } = req.body;

    try {
        const newSpecialty = await create({ name });

        res.status(201).json({
            success: true,
            data: newSpecialty
        });

    } catch (error) {
        console.error('Error al crear la especialidad:', error);
        res.status(500).json({ error: error.message });
    }
};


export const viewAllSpecialty = async (req, res) => {
    try {
        // the service doesn't use the request/response objects so don't pass them
        const viewSpecialty = await view();
        res.status(200).json({
            data: viewSpecialty
        });
    } catch (error) {
        console.error('Error al ver todas las especialidades:', error);
        res.status(500).json({ error: error.message });
    }
};