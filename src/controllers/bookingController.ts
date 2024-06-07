import { Bookingmodel } from "../models/BookingModel"
import {Request,Response} from 'express'
import { BookingRepository } from "../repositories/BookingRepository"
import { BookingService } from "../service/BookingService"
import { BossRepository } from "../repositories/BossRepository"
import { BossService } from "../service/BossService"
import { Bossmodel } from "../models/BossModel"
import { codes } from "../httpCode"
import { number } from "yup"



const bookingRepository = new BookingRepository(Bookingmodel)
const bookingService = new BookingService(bookingRepository)

const bossRepository = new BossRepository(Bossmodel)
const bossService = new BossService(bossRepository)

export async function createBooking(request:Request,response:Response) {
    const booking = {
        number:request.body.number,
        type:request.body.type,
        guest_capacity:request.body.guest_capacity,
        daily_rate:request.body.daily_rate,
        status:request.body.status,
        photo:request.body.photo
    }
    const id = request.body._id
    try {
        const result = bookingService.createBooking(booking,bossService,id)
        return response.status(codes.create).send(result)
    } catch (error:any) {
        return response.status(401).json({error:error.message})
    }
}