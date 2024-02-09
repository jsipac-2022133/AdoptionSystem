//lÓGICA
'use strict'

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'


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

// Login
export const login = async(req, res) => {
    try {
        //Recibir informacion
        let {username, password} = req.body
        //Validar informacion
        let user = await User.findOne({username}) //Verifica el usuario
        //Verifica la contraseña
        if(user && await checkPassword(password, user.password)) {
            // Envia unicamente los datos necesarios
            let loggerUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            // Dar acceso
            return res.send({message: `Welcome ${user.name}`, loggerUser})
        }
        return res.status(404).send({message: 'User or password incorrect'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error logging in', err})
    }
}

export const update =async(req, res)=>{
    try {
        //Obtener el id del usuario a actualizar
        let {id} =req.params
        //obtener datos que vamos a actualizar
        let data=req.body
        //validar si trae datos a actualziar
        let update=checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submited some data that cannot be updated or missing data'})
        //validar si tiene permisos(tokenización)
        //actualizar en la bd
        let updatedUser=await User.findOneAndUpdate(
            {_id: id}, //objectId <- hexadecimal (Hora sys, versión mongo, llave privada...)
            data, //datos que va a actualizar
            {new: true} //objeto de la bd ya actualizado
        )
        //Validar si se actualizó
        if(!updatedUser) return res.status(401).send({message: 'User not found and not updated'})
        //responder con el dato actualizado
        return res.send({message: 'Updated user', updatedUser})
    } catch (error) {
        console.error(error)
        if(error.keyValue.username) return res.status(400).send({message: `Username ${error.keyValue.username} is already taken`})
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteU=async(req, res)=>{
    try {
        //Obtener id
        let {id}=req.params
        //validar si está logeado y es el mismo
        //eliminar (deleteOne / findOneAndDelete)
        let deletedUser=await User.findOneAndDelete({_id: id})
        //verificar que se eliminó
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not deleted'})
        //respodner
        return res.send({message: `Account with username ${deletedUser.username} deleted sucessfully` })
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting account'})
    }
}






