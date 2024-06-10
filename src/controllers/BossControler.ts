import { Request, Response } from 'express'
import { codes } from "../httpCode"
import * as yup from "yup"
import { BossRepository } from '../repositories/BossRepository'
import { BossService } from '../service/BossService'
import { BossModel } from '../models/BossModel'

const bossRepository = new BossRepository(BossModel)
const bossService = new BossService(bossRepository)

export async function createBoss(request: Request, response: Response) {
    try {
        const newUser = request.body
        const userValidation = yup.object({
            email: yup.string().email().required(),
            password: yup.string().required()
        })
        await userValidation.validate(newUser)
        
        const result = await bossService.createBoss(newUser)
        return response.status(codes.created).send(result)
    } catch (error:any) {
        return response.status(codes.badRequest).json({ error: error.message })
    }
}

export async function loginBoss(request: Request, response: Response) {
    const loginData = request.body
    try {
        const loginValidation = yup.object({
            email: yup.string().email().required(),
            password: yup.string().required()
        });
        await loginValidation.validate(loginData)
        
        const result = await bossService.loginBoss(loginData)
        return response.status(codes.created).send({ token: result })
    } catch (error:any) {
        return response.status(codes.badRequest).json({ error: error.message })
    }
}
