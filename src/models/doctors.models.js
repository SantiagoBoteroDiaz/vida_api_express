import mongoose from "mongoose";

export const doctorsSchema = new mongoose.Schema(
    {
        id: String,
        name: String,
        speciality_id: String
    },
    {
        timestamps: true
    }
)

export const Doctor = mongoose.model('Doctor', doctorsSchema);