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
            name:yup.string(),
            email:yup.string().email(),
            password:yup.string(),
            cpf:yup.string(),
            phone_number:yup.string()
        })
        await uservalidation.validate(newUser)
        const result = await userService.createUser(newUser)
        return response.sendStatus(codes.create).send({result})
    }catch(error:any){
        return response.status(codes.badRequest).json({error:error.message})
    }
}