import { getAllAppoiments} from "../services/appointments.service.js" 

export const getAll = async (req , res ) => {
    try {
        const appointment = await getAllAppoiments(); 
        res.status(200).json({appointment: appointment})
    } catch(error) {
        console.error("error al obtener los doctores" , error); 
        res.status(500).json({"error al obtenber las citas" : error})   
    }
}