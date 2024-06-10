import { UserModel } from "../models/UserModel"
import { UserRepository } from "../repositories/UserRepository"
import { UserService } from "../service/UserService"
import { Request, Response } from 'express'
import { codes } from "../httpCode"
import * as yup from "yup"
import { BookingRepository } from "../repositories/BookingRepository"
import { BookingModel } from "../models/BookingModel"
import { BookingService } from "../service/BookingService"

const userRepository = new UserRepository(UserModel)
const userService = new UserService(userRepository)

const bookingRepository = new BookingRepository(BookingModel)
const bookingService = new BookingService(bookingRepository)

export async function createUser(request: Request, response: Response) {
    try {
        const newUser = request.body
        const userValidation = yup.object({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required(),
            cpf: yup.string().required(),
            phone_number: yup.string().required()
        })
        await userValidation.validate(newUser)
        
        const result = await userService.createUser(newUser)
        return response.status(codes.created).send(result)
    } catch (error:any) {
        return response.status(codes.badRequest).json({ error: error.message })
    }
}

export async function loginUser(request: Request, response: Response) {
    const loginData = request.body
    try {
        const loginValidation = yup.object({
            email: yup.string().email().required(),
            password: yup.string().required(),
        })
        await loginValidation.validate(loginData)
        
        const token = await userService.loginUser(loginData)
        return response.status(codes.created).send({token:token})
    } catch (error:any) {
        return response.status(codes.badRequest).json({ error: error.message })
    }
}

export async function listUserBookings(request: Request, response: Response) {
    try {
        const userId = request.user.id
        const userWithBookings = await userService.listUserBookings(userId)
        if (userWithBookings) {
            return response.status(codes.created).send({list:userWithBookings.bookings})
        } else {
            return response.status(codes.badRequest).json({ error: "User not found" })
        }
    } catch (error: any) {
        return response.status(codes.badRequest).json({ error: error.message })
    }
}

export async function deleteBooking(request: Request, response: Response){
    try {
        const userId = request.user.id
        const returned = userService.removeBooking(userId,request.body.bookingId,bookingService)
        return response.status(codes.created).send({returned})
    } catch (error: any) {
        return response.status(codes.badRequest).json({ error: error.message })
    }
}
