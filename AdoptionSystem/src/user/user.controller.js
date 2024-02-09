//lÓGICA
'use strict'

import User from './user.model.js'
import { encrypt } from '../utils/validator.js'


export const test=(req,res)=>{
    return res.send('Hello World')
}

export const register=async(req,res)=>{//solo para clientes
    try {
        //capturar la información del cliente(body)
        let data=req.body
        //Encriptar contraseña
        data.password=await encrypt(data.password)
        //asignar el rol por defecto
        data.role='CLIENT' //SI VIENE CON OTRO VALOR O NO VIENE, LE ASIGNA EL ROL CLIENTE
        //crear una instancia del modelo(schema)
        let user=new User(data)
        //guardar la info
        await user.save()
        //responder al usuario
        return res.send({message: 'Registered Successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error registering user',error})
    }
}

export const login = async(req, res)=>{
    try {
        //Capturar la informacion(body)
        let { username, password } = req.body
        //Validar que el usuairo existe
        let user = await User.findOne({ username }) //Username
        //Verificar que la contraseña coincida
        if(!user) return res.status(404).send({message: 'User not found'})    
        //Respoder (dar acceso)
        return res.send({message: `Welcome ${username}`})
    } catch (error) {
        console.log(error)  
        return res.status(500).send({message: 'Failed to login'})
    }
}

//ACTUALIZAR
export const updateUser = async(id, newData) => {
    return User.findByIdAndUpdate(id, newData, { new: true });
}

//MOSTRAR
export const getAllUsers = async() => {
    return User.find({});
};


//ELIMINAR
export const deleteUser = async (id) => {
    return User.findByIdAndDelete(id);
};







