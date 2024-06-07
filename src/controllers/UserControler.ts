import { Usermodel } from "../models/UserModel"
import { UserRepository } from "../repositories/UserRepository"
import { UserService } from "../service/UserService"
import {Request,Response} from 'express'
import { codes } from "../httpCode"
import * as yup from "yup"


const userRepository = new UserRepository(Usermodel)
const userService = new UserService(userRepository)

export async function createUser(request:Request,response:Response) {
    try {
        const newUser = request.body
        const uservalidation = yup.object({
            name:yup.string().required(),
            email:yup.string().email().required(),
            password:yup.string().required(),
            cpf:yup.string().required(),
            phone_number:yup.string().required()
        })
        await uservalidation.validate(newUser)
        const result = await userService.createUser(newUser)
        return response.status(codes.create).send(result)
    }catch(error:any){
        return response.status(codes.badRequest).json({error:error.message})
    }
}

export async function loginUser(request:Request,response:Response) {
    const data = request.body
    try {
        const result = await userService.loginUser(data)
        console.log(result)
        return response.status(codes.create).send({result})
    } catch (error:any) {
        return response.status(codes.badRequest).json({error:error.message})
    }
}