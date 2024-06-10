import { IUser, IUserDTO, IUserLogin } from "../entities/User"
import { UserRepository } from "../repositories/UserRepository"
import { hash, compare } from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'
import mongoose from "mongoose"
import { BookingService } from "./BookingService"

export class UserService {
    private repository: UserRepository
    constructor(repository: UserRepository) {
        this.repository = repository
    }

    async createUser(userData: IUserDTO): Promise<IUser> {
        try {
            const existingUser = await this.repository.getUserByEmail(userData.email)
            if (existingUser) {
                throw new Error("User already exists")
            }

            const hashedPassword = await hash(userData.password, 6)
            const user = await this.repository.createUser({ ...userData, password: hashedPassword, bookings: [] })
            return user
        } catch (error:any) {
            throw new Error(`Error creating user: ${error.message}`)
        }
    }

    async loginUser(loginData: IUserLogin): Promise<string> {
        try {
            const user = await this.repository.getUserByEmail(loginData.email)
            if (!user) {
                throw new Error("User not found")
            }

            const passwordMatch = await compare(loginData.password, user.password)
            if (!passwordMatch) {
                throw new Error("Invalid password")
            }
            
            const token = jwt.sign({id:user._id},process.env.SECRET as string,{ expiresIn: "50m" })
            return token
        } catch (error:any) {
            throw new Error(`Error logging in: ${error.message}`)
        }
    }

    async addBooking(userId: string, bookingId: string): Promise<void> {
        try {
            await this.repository.addBookingToUser(
                new mongoose.Types.ObjectId(userId),
                new mongoose.Types.ObjectId(bookingId)
            );
            console.log('Booking added to user successfully')
        } catch (error) {
            console.error('Error adding booking to user:', error)
        }
    }

    async listUserBookings(userId: string): Promise<IUser | null> {
        try {
            return await this.repository.listUserBookings(new mongoose.Types.ObjectId(userId))
        } catch (error: any) {
            throw new Error(`Error listing user bookings: ${error.message}`)
        }
    }

    async removeBooking(userId: string, bookingId: string,bookingService:BookingService): Promise<void> {
        try {
            await this.repository.removeBookingFromUser(
                new mongoose.Types.ObjectId(userId),
                new mongoose.Types.ObjectId(bookingId)
            )
            await bookingService.deleteBooking(bookingId)
        } catch (error:any) {
            throw new Error(`Error removing booking from user: ${error.message}`)
        }
    }
}