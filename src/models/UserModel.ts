import mongoose from "mongoose"
import { Iuser } from "../entities/User"

const UserSchema = new mongoose.Schema<Iuser>({
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
    bookings:[mongoose.Schema.Types.ObjectId]
})

export const User = mongoose.model("User",UserSchema)