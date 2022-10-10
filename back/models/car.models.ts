import mongoose from 'mongoose'

const carSchema = new mongoose.Schema({
    car_registration: {
        type: String, 
        required: true
    }, 
    model: {
        type: String,
        required: true
    },
    color: String
})

const Car = mongoose.model('Car', carSchema);

export { Car }