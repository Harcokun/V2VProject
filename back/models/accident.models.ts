import mongoose from "mongoose";

const accidentSchema = new mongoose.Schema({
    car_id: {
        type: String, 
        required: true
    }, 
    timestamp: {
        type: String,
        required: true
    },
})

const Accident = mongoose.model('Accident', accidentSchema);

export { Accident }