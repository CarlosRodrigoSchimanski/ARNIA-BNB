import mongoose from 'mongoose'
import { IBooking } from '../entities/Booking'

export class BookingRepository {
    private roomModel: mongoose.Model<IBooking>;

    constructor(roomModel: mongoose.Model<IBooking>) {
        this.roomModel = roomModel;
    }

    async findBookingById(id: string): Promise<IBooking | null> {
        return this.roomModel.findById(id).exec();
    }

    async findAllBookings(): Promise<IBooking[]> {
        return this.roomModel.find().exec();
    }

    async findBookingsByRoomIdAndStatusAndDateRange(booking: IBooking): Promise<IBooking[]> {
        return this.roomModel.find({
            id_room: booking.id_room,
            status: { $in: ['confirmada', 'em andamento'] },
            $or: [
                { checkin_date: { $lt: booking.checkout_date }, checkout_date: { $gt: booking.checkin_date } }
            ]
        }).exec();
    }

    async createBooking(data: IBooking): Promise<IBooking> {
        const booking = new this.roomModel(data);
        return booking.save();
    }

    async findBookingsByDateRange(startDate: Date, endDate: Date): Promise<IBooking[]> {
        return this.roomModel.find({
            $or: [
                { checkin_date: { $gte: startDate, $lte: endDate } },
                { checkout_date: { $gte: startDate, $lte: endDate } },
                { checkin_date: { $lte: startDate }, checkout_date: { $gte: endDate } }
            ]
        }).exec();
    }
}