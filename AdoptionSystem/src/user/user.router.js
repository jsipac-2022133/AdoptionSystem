'use strict'

import express from 'express'
import {test, register,login, updateUser, getAllUsers, deleteUser} from './user.controller.js'

const api=express.Router()

api.get('/test', test)
api.post('/register', register)
api.post('/login',login)

api.put('/update/:id', async (req, res) => {
    try {
        const result = await updateUser(req.params.id, req.body);
        res.send({ data: result });
    } catch (error) {
        res.status(500).send({ error: 'Error al actualizar usuario' });
    }
});

api.get('/select', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.send({ users });
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener usuarios' });
    }
});

api.delete('/delete/:id', async (req, res) => {
    try {
        await deleteUser(req.params.id);
        res.send({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).send({ error: 'Error al eliminar usuario' });
    }
});


export default api

//export const api  TENGO SÍ O SÍ EL NOMBRE QUE ESTÁ EN EL ARCHIVO API
//export default api //importar con otro nombre