import mongoose from 'mongoose'
import { IBooking } from '../entities/Booking'
import { number } from 'yup'

export class BookingRepository{
    private bookingModel:mongoose.Model<IBooking>
    constructor(bookingModel:mongoose.Model<IBooking>){
        this.bookingModel = bookingModel
    }

    async findBookingByNumber(number:number){
        return this.bookingModel.findOne({number:number})
    }

    async createBooking(data:IBooking): Promise<IBooking>{
        return this.bookingModel.create(data)
    }
}