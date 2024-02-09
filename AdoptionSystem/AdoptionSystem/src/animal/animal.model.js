//name
//type
//age
//keeper
//description
import mongoose, { Schema } from "mongoose"


const animalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    keeper: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'user'
    }

    
})

export default mongoose.model('animal', animalSchema)