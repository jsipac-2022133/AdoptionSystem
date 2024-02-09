//JAMES SIPAC
import express from 'express'
import { regist, updateAnimal, deleteAnimal,getAllAnimals, searchAnimal } from './animal.controller.js';

const api = express.Router();

api.post('/regist', regist)
api.put('/updateAnimal/:id', updateAnimal)
api.delete('/deleteAnimal/:id', deleteAnimal)
api.get('/select', async (req, res) => {
    try {
        const users = await getAllAnimals();
        res.send({ users });
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener usuarios' });
    }
});

api.post('/searchAnimal', searchAnimal)

export default api