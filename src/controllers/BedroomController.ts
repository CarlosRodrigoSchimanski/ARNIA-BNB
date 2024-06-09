import { Request, Response } from 'express'
import { codes } from "../httpCode"
import { BedroomModel } from '../models/BedroonModel'
import { BedroomRepository } from '../repositories/BedroonRepository'
import { BedroomService } from '../service/BedroomService'
import { Bossmodel } from '../models/BossModel'
import { BossRepository } from '../repositories/BossRepository'
import { BossService } from '../service/BossService'
import * as yup from 'yup'

const bedroomRepository = new BedroomRepository(BedroomModel)
const bedroomService = new BedroomService(bedroomRepository)

const bossRepository = new BossRepository(Bossmodel)
const bossService = new BossService(bossRepository)



export async function createBedroom(request: Request, response: Response) {
    try {
        const bedroomSchema = yup.object().shape({
            number: yup.number().required(),
            type: yup.string().required(),
            guest_capacity: yup.number().required(),
            daily_rate: yup.number().required(),
            status: yup.string().required(),
            photo: yup.string().required()
        })
        await bedroomSchema.validate(request.body, { abortEarly: false })

        const { number, type, guest_capacity, daily_rate, status, photo, _id: id } = request.body

        const result = await bedroomService.addRoom({ number, type, guest_capacity, daily_rate, status, photo }, bossService, id)
        return response.status(codes.created).send(result)

    } catch (error:any) {
        return response.status(codes.badRequest).json({ error: error.message })
    }
}

export async function updateStatus(request: Request, response: Response) {
    try {
        const updateStatusSchema = yup.object().shape({
            roomNumber: yup.number().required(),
            status: yup.string().required(),
            _id: yup.string().required()
        })
        await updateStatusSchema.validate(request.body, { abortEarly: false })

        const { roomNumber, _id: id, status } = request.body

        const result = await bedroomService.updateRoomStatus(roomNumber, status, bossService, id)
        return response.status(codes.created).send({ status })
    } catch (error:any) {
        return response.status(codes.badRequest).json({ error: error.message })
    }
}

export async function returnFree(request: Request, response: Response) {
    try {
        const freeRooms = await bedroomService.getFreeRooms()
        return response.status(codes.created).json(freeRooms)
    } catch (error:any) {
        return response.status(codes.badRequest).json({ error: error.message })
    }
}
