import { IBooking } from "../entities/Booking"
import { BookingRepository } from "../repositories/BookingRepository"

export class BookingService {
    private repository: BookingRepository

    constructor(repository: BookingRepository) {
        this.repository = repository
    }

    async createReservation(data: IBooking): Promise<IBooking> {
        try {
            const existingReservations = await this.repository.findBookingsByRoomIdAndStatusAndDateRange(data)
            if (existingReservations.length > 0) {
                throw new Error("Room already booked")
            }

            const newReservation = await this.repository.createBooking(data)
            return newReservation
        } catch (error) {
            throw error
        }
    }
}