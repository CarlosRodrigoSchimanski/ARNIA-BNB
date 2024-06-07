import {mongoose} from "../database/database"
import { IBooking } from "../entities/Booking"

const BookingSchema = new mongoose.Schema<IBooking>({
    number:{type:Number,required:true},
    type:{type:String,required:true},
    guest_capacity:{type:Number,required:true},
    daily_rate:{type:Number,required:true},
    photo:{type:String,required:true},
    status:{type:String,required:true} //Status do quarto (por exemplo, "disponível", "ocupado", "em manutenção").
})

export const Bookingmodel = mongoose.model("Booking",BookingSchema)