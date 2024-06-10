import { Request, Response } from 'express'
import { codes } from '../httpCode'
import { BookingRepository } from '../repositories/BookingRepository'
import { BookingModel } from '../models/BookingModel'
import { BookingService } from '../service/BookingService'
import { IBooking } from '../entities/Booking'
import * as yup from 'yup'
import { UserRepository } from '../repositories/UserRepository'
import { UserModel } from '../models/UserModel'
import { UserService } from '../service/UserService'

const bookingRepository = new BookingRepository(BookingModel)
const bookingService = new BookingService(bookingRepository)

const userRepository = new UserRepository(UserModel)
const userService = new UserService(userRepository)

export async function createReservation(request: Request, response: Response) {
    try {
        const reservationSchema = yup.object().shape({
            checkin_date: yup.date().required(),
            checkout_date: yup.date().required(),
            guests: yup.number().required(),
            id_room: yup.string().required()
        })
        await reservationSchema.validate(request.body, { abortEarly: false })

        const newReservation: Omit<IBooking, '_id'> = {
            checkin_date: request.body.checkin_date,
            checkout_date: request.body.checkout_date,
            guests: request.body.guests,
            id_room: request.body.id_room,
            id_guest: request.user.id,
            status: "confirmada"
        }

        const createdReservation = await bookingService.createReservation(newReservation,userService)
        return response.status(codes.created).send(createdReservation)

    } catch (error:any) {
        console.error("Error creating reservation:", error)
        return response.status(codes.badRequest).json({ error: error.message })
    }
}
