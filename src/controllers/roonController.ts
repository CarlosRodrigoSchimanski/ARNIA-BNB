import {Request,Response} from 'express'
import { RoonRepository } from '../repositories/roonRepository'
import { RoonService } from '../service/RoonService'
import { RoonModel } from '../models/roonModel'
import { IReservas } from '../entities/roon'
import { codes } from '../httpCode'

const roonRepository = new RoonRepository(RoonModel)
const roonService = new RoonService(roonRepository)

export async function createReserva(request:Request,response:Response) {
    const newReserva:IReservas = {
    checkin_date: request.body.checkin_date,
    checkout_date: request.body.checkout_date,
    gests: request.body.gests,
    id_room: request.body.id_room,
    id_guest: request.body._id,
    status: "confirmada"
    }
    try {
        const newRe = await roonService.createReserva(newReserva)
        return response.status(codes.create).send(newRe)
    } catch (error:any) {
        return response.status(codes.badRequest).json({error:error.message})
    }
}