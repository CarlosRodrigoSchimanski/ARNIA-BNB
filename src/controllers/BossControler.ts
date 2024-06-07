
import {Request,Response} from 'express'
import { codes } from "../httpCode"
import * as yup from "yup"
import { BossRepository } from '../repositories/BossRepository'
import { BossService } from '../service/BossService'
import { Bossmodel } from '../models/BossModel'


const bossRepository = new BossRepository(Bossmodel)
const bossService = new BossService(bossRepository)

export async function createBoss(request:Request,response:Response) {
    try {
        const newUser = request.body
        const uservalidation = yup.object({
            email:yup.string().email().required(),
            password:yup.string().required()
        })
        await uservalidation.validate(newUser)
        const result = await bossService.createBoss(newUser)
        return response.status(codes.create).send(result)
    }catch(error:any){
        return response.status(codes.badRequest).json({error:error.message})
    }
}

export async function loginBoss(request:Request,response:Response) {
    const data = request.body
    try {
        const result = await bossService.loginBoss(data)
        console.log(result)
        return response.status(codes.create).send({result})
    } catch (error:any) {
        return response.status(codes.badRequest).json({error:error.message})
    }
}