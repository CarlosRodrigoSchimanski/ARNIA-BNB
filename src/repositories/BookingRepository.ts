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

    async updateStatus(number:number,status:string){
        return this.bookingModel.updateOne({number:number},{status:status})
    }

    async getAllByStatus(status:string){
        return this.bookingModel.find({status:status}).exec()
    }
}