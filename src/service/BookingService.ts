import { date } from "yup"
import { IBooking } from "../entities/Booking"
import { BookingRepository } from "../repositories/BookingRepository"
import { UserService } from "./UserService"
import mongoose from "mongoose"

export class BookingService {
    private repository: BookingRepository

    constructor(repository: BookingRepository) {
        this.repository = repository
    }

    async createReservation(data: Omit<IBooking, '_id'>, userService: UserService): Promise<IBooking> {
        try {
            const existingReservations = await this.repository.findBookingsByRoomIdAndStatusAndDateRange(data)
            if (existingReservations.length > 0) {
                throw new Error("Room already booked")
            }

            const newReservation = await this.repository.createBooking(data);
            await userService.addBooking(data.id_guest.toString(), newReservation._id.toString())

            return newReservation;
        } catch (error) {
            throw new Error(`Error creating reservation: ${error}`)
        }
    }

    async occupiedRoomIdsByDate(date:Date):Promise<string[]>{
        const ocuped = await this.repository.findOccupiedRoomIdsByDate(date)
        return ocuped
    }

    async deleteBooking(bookingId: string): Promise<void> {
        try {
            await this.repository.deleteBookingById(new mongoose.Types.ObjectId(bookingId))
        } catch (error:any) {
            throw new Error(`Error deleting booking: ${error.message}`)
        }
    }
}