import {mongoose} from "../database/database"
import { IUser } from "../entities/User"

const UserSchema = new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    },
    bookings:[{type:String}] //[{type: mongoose.Schema.ObjectId,ref:"Booking"}]
})

export const Usermodel = mongoose.model("User",UserSchema)