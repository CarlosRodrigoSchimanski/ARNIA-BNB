import mongoose from 'mongoose'
import { IBooking } from '../entities/Booking'

export class BookingRepository {
    private bookingModel: mongoose.Model<IBooking>

    constructor(roomModel: mongoose.Model<IBooking>) {
        this.bookingModel = roomModel;
    }

    async findOccupiedRoomIdsByDate(date: Date) {
        try {
            const reservations = await this.bookingModel.find({
                status: { $in: ['confirmada', 'em andamento'] },
                $or: [
                    { checkin_date: { $lt: date }, checkout_date: { $gt: date } },
                    { checkin_date: date, checkout_date: date }
                ]
            }).select('id_room');
            const occupiedRoomIds = reservations.map(reservation => reservation.id_room)
            const listStrings: string[] = occupiedRoomIds.map(objectId => objectId.toString())
            
            return listStrings
        } catch (error) {
            throw new Error(`Erro ao buscar quartos ocupados por data: ${error}`)
        }
    }

    async findBookingById(id: string): Promise<IBooking | null> {
        return this.bookingModel.findById(id).exec()
    }

    async findAllBookings(): Promise<IBooking[]> {
        return this.bookingModel.find().exec()
    }

    async findBookingsByRoomIdAndStatusAndDateRange(booking: Omit<IBooking, '_id'>): Promise<IBooking[]> {
        return this.bookingModel.find({
            id_room: booking.id_room,
            status: { $in: ['confirmada', 'em andamento'] },
            $or: [
                { checkin_date: { $lt: booking.checkout_date }, checkout_date: { $gt: booking.checkin_date } }
            ]
        }).exec()
    }

    async createBooking(data: Omit<IBooking, '_id'>): Promise<IBooking> {
        const booking = new this.bookingModel(data)
        return booking.save()
    }

    async findBookingsByDateRange(startDate: Date, endDate: Date): Promise<IBooking[]> {
        return this.bookingModel.find({
            $or: [
                { checkin_date: { $gte: startDate, $lte: endDate } },
                { checkout_date: { $gte: startDate, $lte: endDate } },
                { checkin_date: { $lte: startDate }, checkout_date: { $gte: endDate } }
            ]
        }).exec();
    }

    async deleteBookingById(id: mongoose.Types.ObjectId): Promise<void> {
        try {
            await this.bookingModel.findByIdAndDelete(id).exec()
        } catch (error) {
            throw new Error(`Error deleting booking: ${error}`)
        }
    }
}