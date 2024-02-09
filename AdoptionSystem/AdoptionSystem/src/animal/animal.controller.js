'use strict'

import Animal from './animal.model.js'
import { checkUpdateAnimal } from '../utils/validator.js'


//AGREGAR
export const regist = async (req, res) => {
    try {
        let data = req.body
        let animal = new Animal(data)
        await animal.save()

        return res.send({ message: `Registered successfully, can be logged with name ${animal.name}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering animal', err: err })
    }
}

//ACTUALIZAR
export const updateAnimal = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdateAnimal(data, id)
        if (!update) return res.status(400).send({ message: 'Have submited some data that cannot be updated or missing data' })

        let updatedAnimal = await Animal.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )

        if (!updatedAnimal) return res.status(401).send({ message: 'Animal not found and not updated' })

        return res.send({ message: 'Updated Animal', updatedAnimal })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating animal' })
    }
}

//ELIMINAR
export const deleteAnimal = async (req, res) => {
    try {
        let { id } = req.params
        let deletedAnimal = await Animal.findOneAndDelete({ _id: id })
        if (!deletedAnimal) return res.status(404).send({ message: 'Animal not found and not deleted' })
        return res.send({ message: `Animal with name ${deletedAnimal.name} deleted sucessfully` })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error deleting animal' })
    }
}

//MOSTRAR
export const getAllAnimals = async () => {
    return Animal.find({});
};

//BUSCAR
export const searchAnimal = async (req, res) => {
    try {
        let { name } = req.body

        let nombre = await Animal.findOne({ name })

        return res.send(nombre)
    
        
    } catch (err) {
    console.error(err)
    return res.status(500).send({ message: 'Error de buscar'})
}
}



