import { createDoctor, getAllDoctors, getDoctorsBySpecialty , doctorDelete, recoveryDoctor, getAllDeleteDoctors } from "../services/doctor.service.js";

export const create = async (req, res) => {

    const { name, specialty } = req.body;

    try {
        const newDoctor = await createDoctor({ name, specialty });

        if (!newDoctor.status) {
            return res.status(500).json({ error: newDoctor.error_message });
        }

        res.status(201).json({response: newDoctor.error_message});

    } catch (error) {
        console.error('Error al crear el doctor:', error);
        res.status(500).json({ error: error.message });
    }

};

export const getAll = async (req, res) => {

    try {
        const doctors = await getAllDoctors();
        res.status(200).json({ response: doctors });
    } catch (error) {
        console.error('Error al obtener los doctores:', error);
        res.status(500).json({ error: error.message });
    }
};


export const getDoctorSpecialty = async (req, res) => {
    const {specialty_id} = req.params ; 
    try {
        const doctors = await getDoctorsBySpecialty(specialty_id);
        res.status(200).json({ response: doctors });
    } catch (error) {
        console.error('Error al obtener los doctores:', error);
        res.status(500).json({ error: error.message });
    }
};

export const deleteDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await doctorDelete(id);
    if (deleted === 0) {
      return res.status(404).json({ error: "Doctor no encontrado" });
    }
    return res.status(200).json({
      message: "Doctor eliminado correctamente",
    });
    
  } catch (error) {
    console.error("error al eliminar el doctor", error);
    return res.status(500).json({ error: "Error interno" });
  }
}; 

export const  recovery = async(req, res) => {
    try {
        const doctor = await recoveryDoctor(req.body.name); 
        res.status(201).json({response: doctor}) 
    } catch (error) {
        console.error(`error al recuperar el doctor ${error}`);
        res.status(500) 
    }
} 

export const getDelete = async (req , res ) => { 
    try {
        const doctors = await getAllDeleteDoctors(); 
        res.status(200).json({'response' : doctors})
    } catch (error) {
        console.error(error)
        res.status(500).json({error : 'error al obtener los doctores eliminados'}) 
    }
}