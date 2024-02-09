//Encriptar, validar...diferentes datos

import {hash} from 'bcrypt'

export const encrypt=async(password)=>{
    try {
        return await hash(password, 10)
    } catch (error) {
        console.error(error)
        return error
    }
}